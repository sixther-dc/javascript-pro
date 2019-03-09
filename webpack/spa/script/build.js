const webpack = require('webpack');
const webpackConfig = require('../config/webpack.common.config');
const errHandler = require('./webpackErrorHandler');


const compiler = webpack(webpackConfig);
compiler.run(errHandler);