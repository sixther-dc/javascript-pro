const TerserPlugin = require('terser-webpack-plugin');
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
        minimizer: [
          new TerserPlugin({
            terserOptions: {
                parallel: 4,
            },
            chunkFilter: (chunk) => {
                // Exclude uglification for the `vendor` chunk
                if (chunk.name === 'stcommon') {
                  return false;
                }
      
                return true;
              },
          }),
        ],
    },
    // devtool: "source-map",
    mode: "production"
}