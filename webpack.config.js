const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require("webpack");

module.exports = {
  mode: 'development',
  entry: {
    app: [
      path.join(__dirname, './src/index.js'),
      'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    hotUpdateChunkFilename: '.hot/hot-update.js',
    hotUpdateMainFilename: '.hot/hot-update.json',
  },
  watchOptions: {
    ignored: '/node_modules/',
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
        {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['react-hot-loader/babel'],
                }
            }
        },
        {
            test: /\.scss$/i,
            use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
            test: /\.svg/,
            use: {
                loader: "svg-url-loader",
                options: {
                    // make all svg images to work in IE
                    iesafe: true,
                },
            },
        },
    ]
  },
  plugins: [
    new CopyPlugin({
        patterns: [
          { from: "public", to: "public"},
          { from: "src/index.html"}
        ],
      }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
