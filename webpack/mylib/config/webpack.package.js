const path = require('path');
module.exports = {
    optimization: {
        //设置要不要混淆
        minimize: false
    },
    entry: {
        stdata: path.join(__dirname, '../src/stdata.js'),
        stui: path.join(__dirname, '../src/stui.js')
    },
    output: {
        path: path.join(__dirname, '../package'),
        libraryTarget: 'umd',
        library: '[name]',
        filename: "[name]1.js",
        publicPath: "/",
    },
    devtool: "source-map",
    mode: "development"
}