const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function() {
    return {
        //支持多条打包路径
        entry: { 
            home : './main.js'
        },
        mode: 'development',
        // mode: 'production',
        // devtool: 'inline-source-map',
        output: {
            //这里的name就是每条entry的key值，默认为main
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
            // sourceMapFilename: '[file].map'
            //libraryTarget: 'var',
            //library: 'xxxx',
        },
        resolve: {
            extensions: ['.js', '.json'],
            //Tell webpack what directories should be searched when resolving modules.
            modules: [
                'src',
                'js',
                'node_modules'
            ],
            alias: {
                "angular" : path.resolve(__dirname, 'src/lib/angular'),
                "jquery" : path.resolve(__dirname, 'src/lib/jquery-3.3.1.min'),
                "uirouter" : path.resolve(__dirname, 'src/lib/angular-ui-router'),
                "framework": path.resolve(__dirname, 'src/framework'),
                "fruitProvider": path.resolve(__dirname, 'src/fruitProvider'),
                "backend": path.resolve(__dirname, 'src/systemService'),

            }
        },
        plugins: [
            // new webpack.ProvidePlugin({
            //     'windows.angular': 'angular'
            //   })

            new CleanWebpackPlugin(['dist']),
            
            new HtmlWebpackPlugin({
                template: './index.html',
                filename: 'index.html',
                inject: 'true'
            })
        ],
        //将全局模块导出为conmmonjs格式
        module: {
            rules: [
                {
                    test: /angular\.js$/, 
                    loader: "exports-loader?angular" 
                },
                {
                    test: /\.html$/, 
                    loader: "html-loader" 
                }
            ]
        }
    }   
}