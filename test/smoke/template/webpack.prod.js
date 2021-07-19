'use strict';

const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// webpack5 使用css-minimizer-webpack-plugin
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const setMPA = () =>{
  const entry = {}
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(__dirname,'./src/*/index.js'))
 
  Object.keys(entryFiles)
    .map((index)=>{
      const enntryFile = entryFiles[index]
      const match = enntryFile.match(/src\/(.*)\/index\.js$/)
      const pageName = match && match[1]
      entry[pageName] = enntryFile
      htmlWebpackPlugins.push(new HtmlWebpackPlugin({
        template:path.join(__dirname,`src/${pageName}/index.html`),
        filename:`${pageName}.html`,
        chunks:[pageName],
        inject:true,
        minify:{
            html:true,
            collapseWhitespace:true,
            preserveLineBreaks:false,
            minifyCSS:true,
            minifyJS:true,
            removeComments:false
            }
      }),)
    })
  return {
    entry,
    htmlWebpackPlugins
  }
}
const { entry,htmlWebpackPlugins } = setMPA()
module.exports ={
  entry:entry,
  output:{
    path: path.join(__dirname,'dist'),
    filename:'[name][chunkhash:8].js'
  },
  mode:'production',
  module:{
    rules:[
      {
        test:/.js$/,
        use:'babel-loader'
      },{
        test:/.css$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },{
        test:/.less$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options:{
              postcssOptions:{
                plugins:[
                  require('autoprefixer')({
                    browsers:['last 2 version','>1%','iOS 7']
                  })
                ]
              }
            }
          },
          {
            loader:'px2rem-loader',
            options:{
              remUnit:75,
              remPrecision:8//小数点
            }
          }
        ]
      },{
        test:/.(png|jpg|jpeg|gif)$/,
        use:[
          {
            // loader:'url-loader',
            loader:'file-loader',
            options:{
              // limit:10240,//小于10kb自动转为base64导入 
              name:`images/[name][hash:8].[ext]`
            }
          }
        ]
      },{
        test:/.(woff|woff2|eot|ttf|otf)$/,
        use:'file-loader'
      }
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:`[name][contenthash:8].css`
    }),
    new CssMinimizerPlugin ({
      test:/\.css$/g
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ].concat(htmlWebpackPlugins),
  stats:'errors-only'
}