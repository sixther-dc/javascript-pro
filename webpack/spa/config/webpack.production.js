module.exports = {
    output: {
        //path:    默认为dist
        // filename: "prod/[name].[query].[hash:5].bundle.js",
        filename: function(c) {
            let name = c.chunk.name.split("_")[1];
            return `prod/${name}.bundle.js`
        },
        publicPath: "/"
    },
    optimization: {
        //设置要不要混淆
        minimize: true
    },
    // devtool: "source-map",
    mode: "production"
}