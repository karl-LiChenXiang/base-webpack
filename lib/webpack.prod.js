const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const prodConfig = {
  mode: 'production',
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    // new CssMinimizerPlugin({
    //   test: /\.css$/g,
    // }),
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
