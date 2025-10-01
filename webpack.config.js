const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const fs = require('fs');

/*
const webpackMockServer = require('webpack-mock-server');
*/

module.exports = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    entry: {
        index: './src/js/index.js',
        'file-upload': './src/js/file-upload.js',
        'batch-upload': './src/js/batch-upload.js',
        'sign': './src/js/sign.js',
    },
    output: {
        filename: 'static/js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                // https://webpack.js.org/loaders/babel-loader/#root
                test: /\.m?js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i, //讀取檔名含有 .sass 和 .scss 的檔案
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[name][ext]'
                }
            },

            {
                test: /\.(woff|eot|ttf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            },
            {
                // https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
                resourceQuery: /raw/,
                type: 'asset/source'
            },
            {
                // https://webpack.js.org/loaders/html-loader/#usage
                resourceQuery: /template/,
                loader: 'html-loader'
            },
        ]
    },
    plugins: [
        new Dotenv({
            path: './.env.' + (process.env.NODE_ENV || '').trim(),
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new FaviconsWebpackPlugin({
            logo: './src/assets/ico/favicon.ico',
            inject: true,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'src/assets/img', to: 'assets/img'}
            ]
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            head: fs.readFileSync(__dirname + '/src/head.html'),
            template: './src/views/login.html',
            inject: true,
            minify: true,
            filename: 'login.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            head: fs.readFileSync(__dirname + '/src/head.html'),
            header: fs.readFileSync(__dirname + '/src/header.html'),
            aside: fs.readFileSync(__dirname + '/src/aside.html'),
            footer: fs.readFileSync(__dirname + '/src/footer.html'),
            template: './src/views/home.html',
            inject: true,
            minify: true,
            filename: 'home.html',
            chunks: ['index', 'file-upload'],
        }),
        new HtmlWebpackPlugin({
            head: fs.readFileSync(__dirname + '/src/head.html'),
            header: fs.readFileSync(__dirname + '/src/header.html'),
            aside: fs.readFileSync(__dirname + '/src/aside.html'),
            footer: fs.readFileSync(__dirname + '/src/footer.html'),
            template: './src/views/dashboard.html',
            inject: true,
            minify: true,
            filename: 'dashboard.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            head: fs.readFileSync(__dirname + '/src/head.html'),
            header: fs.readFileSync(__dirname + '/src/header.html'),
            aside: fs.readFileSync(__dirname + '/src/aside.html'),
            footer: fs.readFileSync(__dirname + '/src/footer.html'),
            template: './src/views/account.html',
            inject: true,
            minify: true,
            filename: 'account.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            head: fs.readFileSync(__dirname + '/src/head.html'),
            header: fs.readFileSync(__dirname + '/src/header.html'),
            aside: fs.readFileSync(__dirname + '/src/aside.html'),
            footer: fs.readFileSync(__dirname + '/src/footer.html'),
            template: './src/views/account-settings.html',
            inject: true,
            minify: true,
            filename: 'account-settings.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            head: fs.readFileSync(__dirname + '/src/head.html'),
            header: fs.readFileSync(__dirname + '/src/header.html'),
            aside: fs.readFileSync(__dirname + '/src/aside.html'),
            footer: fs.readFileSync(__dirname + '/src/footer.html'),
            template: './src/views/sign.html',
            inject: true,
            minify: true,
            filename: 'sign.html',
            chunks: ['index', 'sign'],
        }),
        new HtmlWebpackPlugin({
            head: fs.readFileSync(__dirname + '/src/head.html'),
            header: fs.readFileSync(__dirname + '/src/header.html'),
            aside: fs.readFileSync(__dirname + '/src/aside.html'),
            footer: fs.readFileSync(__dirname + '/src/footer.html'),
            template: './src/views/file-upload.html',
            inject: true,
            minify: true,
            filename: 'file-upload.html',
            chunks: ['index', 'batch-upload'],
        }),
    ],
    devServer: {
        port: 9000,
        compress: true,
        hot: true,
        static: path.join(__dirname, './src'),
    },
};
