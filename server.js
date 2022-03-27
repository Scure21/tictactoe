const express = require('express')
const path = require('path');
const app = express()
const port = 3000
/**Webpack middleware */
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackCompiler = webpack(webpackConfig);

app.use(
   require('webpack-dev-middleware')(webpackCompiler, {
     publicPath: webpackConfig.output.publicPath,
    }),
);

app.use(
   require('webpack-hot-middleware')(webpackCompiler, {
     path: '/__webpack_hmr',
   }),
);

app.use(express.static(path.resolve(__dirname, 'dist')))
app.use(express.static(path.resolve(__dirname, 'dist', 'public')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
