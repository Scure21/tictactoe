const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
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
                presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
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
  ],
};
