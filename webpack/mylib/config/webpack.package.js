const path = require('path');
module.exports = {
    entry: {
        stdata: path.join(__dirname, '../src/stdata.js'),
        stui: path.join(__dirname, '../src/stui.js')
    },
    output: {
        path: path.join(__dirname, '../package'),
        libraryTarget: 'umd',
        library: '[name]',
        filename: "[name].js",
        publicPath: "/",
    },
    devtool: "source-map",
    mode: "production"
}