const webpack = require('webpack');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../config/webpack.common.config');
const express = require('express');
const open = require('open');


const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {

}));


app.use(webpackHotMiddleware(compiler, {
    log: console.log, 
    path: '/__webpack_hmr', 
    heartbeat: 10 * 1000
  }));

app.listen(3333, () => {
    console.log("Example app listening on port 3333!")
    open("http://localhost:3333/index.html")
})