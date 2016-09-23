var webpack = require('webpack');
var path = require('path');
var config = require('./webpack.config');
var CopyWebpackPlugin = require('copy-webpack-plugin');

config.devtool = 'eval';
// config.devtool = 'eval-cheap-module-source-map';
config.output = {
    filename: '[name].bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'src')
};

const copyAssets = [{
    from: './src/assets',
    to: 'assets'
}];
config.plugins.push(new CopyWebpackPlugin(copyAssets));

config.plugins = config.plugins
    .concat([
        new webpack.HotModuleReplacementPlugin()
    ]);

module.exports = config;
