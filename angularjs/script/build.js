const webpack = require("webpack");
const webpackConfig = require("../webpack-prod.config.js");
const errHandler = require('./webpackErrorHandler');
const compiler = webpack(webpackConfig());
compiler.run(errHandler);
