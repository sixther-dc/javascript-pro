const webpack = require('webpack');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');
const express = require('express');
const open = require('open');
const path = require('path');
const apiMocker = require('mocker-api');


const app = express();
const compiler = webpack(webpackConfig());

app.use(webpackDevMiddleware(compiler, {

}));

apiMocker(app, path.resolve('./src/mock/index.js'))

app.use(webpackHotMiddleware(compiler, {
    log: console.log, 
    path: '/__webpack_hmr', 
    heartbeat: 10 * 1000
  }));

app.listen(3000, () => {
    console.log("Example app listening on port 3000!")
    open("http://localhost:3000/index.html")
})