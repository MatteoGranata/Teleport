const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),

    ],
    devServer: {
        open: true,
        host: 'localhost',
        static: path.resolve(__dirname, 'dist'),
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
              },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
};
