const fs = require('fs-extra');
const path  = require('path');
const webpack = require("webpack");
const webpackConfig = require("../config/webpack.common.config");
const compiler = webpack(webpackConfig);
compiler.run();

fs.copySync(
    path.resolve(__dirname, './mainfest'),
    path.resolve(__dirname, '../package'),
)
