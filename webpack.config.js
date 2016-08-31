var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var METADATA = require('./src/METADATA.js');

module.exports = {
    debug: true,
    postcss: () => [autoprefixer],
    entry: {},
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/app\/lib/, /node_modules/],
                loader: 'ng-annotate!babel'
            }, {
                test: /\.html$/,
                loader: 'raw'
            }, {
                test: /\.styl$/,
                loader: 'style!css!stylus'
            }, {
                test: /\.css$/,
                loader: 'style!css'
            },
            { 
                test: /\.scss$/, 
                loader: "style-loader!raw-loader!sass-loader?includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib")
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&minetype=application/font-woff'
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ],
        noParse: []
    },
    plugins: [
        new ProgressBarPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module, count) => { // min entries shared >=2
                return module.resource && module.resource.indexOf(path.resolve(__dirname, 'src')) === -1;
            }
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            inject: 'body',
            hash: true,
            title: METADATA.webTitle,
            author: METADATA.webAuthor,
            description: METADATA.webDescription,
            baseUrl: METADATA.baseUrl,
            iconUrl: METADATA.iconUrl
        })
    ]
};
