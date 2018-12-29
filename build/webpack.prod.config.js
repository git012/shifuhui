const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');

fs.open('./src/config/env.js', 'w', function (err, fd) {
    const buf = 'export default "production";';
    fs.write(fd, buf, 0,'utf-8', function (err, written, buffer) {});
});

module.exports = merge(webpackBaseConfig, {
    output: {
        // 正式
        publicPath: 'http://manage.shifuhui.net/iview/',
        // 测试
//      publicPath: 'http://tmanage.yugoubao.net/iview/',

        filename: '[name].js?v=[hash]',
        chunkFilename: '[name].chunk.js?v=[hash]'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css?v=[hash]',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js?v=[hash]'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/template/index.ejs',
            inject: false
        })
    ]
});

