module.exports = {
    output: {
        //path:    默认为dist
        filename: "prod/[name].[hash:5].bundle.js",
        publicPath: "/"
    },
    optimization: {
        //设置要不要混淆
        minimize: true
    },
    // devtool: "source-map",
    mode: "production"
}