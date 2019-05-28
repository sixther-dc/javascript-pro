const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const webpackDeepScopePlugin = require("webpack-deep-scope-plugin").default;
//css的treeshaking
const PurifyCSSPlugin = require('purifycss-webpack');
//提取css文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require("webpack-merge");
const argv = require("yargs-parser")(process.argv.slice(2));
const dcPlugin = require("../src/lib/myplugin/dcPlugin");

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();


const __mode = argv.mode || "development";
const modeFlag = (__mode == "production" ? true : false);
const __mergeConfig = require(`./webpack.${__mode}.js`);
console.log("寻找文件: ", glob.sync(path.join(__dirname, '../src/*.html')))
webpackConfig = {
    entry: {
        main_t: "./src/index.js"
        // style: "./src/style.js"
    },
    optimization: { //优化
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    filename: "prod/vendor.js",
                    chunks: "all"
                },
                stdata: {
                    test: /stdata/,
                    name: "stdata",
                    filename: "prod/stdata.js",
                    chunks: "all",
                    enforce: true
                    //Tells webpack to ignore splitChunks.minSize, splitChunks.minChunks, splitChunks.maxAsyncRequests and splitChunks.maxInitialRequests options
                },
                stcommon: {
                    test: /stcommon/,
                    name: "stcommon",
                    filename: "prod/stcommon.js",
                    chunks: "all",
                    enforce: true
                },

            }
        }
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '/'
                        }
                    },
                    // style-loader将css打包到js文件中
                    // {
                    //     loader: "style-loader"
                    // },
                    //css-loader可以坐css的组件化， 用来处理css文件的内容
                    //localIndentName设置实际设置在dom元素上的类名
                    //规范化解决方案 BEM
                    {
                        // loader: "css-loader?modules&localIdentName=[name]-[local]-[hash:base64:5]"
                        loader: "css-loader",
                        options: {
                            import: true
                        }
                    },
                    {
                        loader: path.resolve("./src/lib/myloader/index")
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }, ]
            },
            {
                test: /\.(woff2|woff|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'assets/fonts/[name]_[hash].[ext]'
                    }
                }]
            }, {
                test: /\.(jpe?g|png|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'assets/images/[name]_[hash].[ext]',
                        limit: 10000
                    }
                }]
            }, {
                test:/\.(js)$/,
                use:{
                    loader:'babel-loader'
                },
            }
        ]
    },
    plugins: [
        new dcPlugin(),
        new CleanWebpackPlugin([
            path.join(__dirname, '../dist')
        ], {
            'root': path.join(__dirname, '..')
        }),
        // new webpackDeepScopePlugin(),
        // new PurifyCSSPlugin({
        //     // Give paths to parse for rules. These should be absolute!
        //     paths: glob.sync(path.join(__dirname, '../src/*.html')),
        // }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: modeFlag ? 'style/[name].[hash:5].css' : 'style/[name].css',
            chunkFilename: modeFlag ? 'style/[id].[hash:5].css' : 'style/[id].css',
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.jquery': 'jquery',
        }),
    ]
}

module.exports = smp.wrap(merge(webpackConfig, __mergeConfig));