const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    stats: 'errors-only',
  },
  devtool: 'source-map', // 调试用
};

module.exports = merge(baseConfig, devConfig);
