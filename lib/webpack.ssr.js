const merge = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /.css$/,
        use: 'ignore-loader',
      }, {
        test: /.less$/,
        use: 'ignore-loader',
      },
    ],
  },
  plugins: [
    new CssMinimizerPlugin({
      test: /\.css$/g,
    }),
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
