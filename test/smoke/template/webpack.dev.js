const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const setMPA = () =>{
  const entry = {}
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(__dirname,'./src/*/index.js'))
  console.log(Object.keys(entryFiles));
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
    filename:'[name].js'
  },
  mode:'development',
  module:{
    rules:[
      {
        test:/.js$/,
        use:'babel-loader'
      },{
        test:/.css$/,
        use:[
          'style-loader',
          'css-loader'
        ]
      },{
        test:/.less$/,
        use:[
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },{
        test:/.(png|jpg|jpeg|gif)$/,
        use:[
          {
            loader:'url-loader',
            options:{
              limit:10240,//小于10kb自动转为base64导入 
            }
          }
        ]
      },{
        test:/.(woff|woff2|eot|ttf|otf)$/,
        use:'file-loader'
      }
    ]
  },
  // //默认false 不开启
	// watch:true,
	// //只有开启监听模式时，watchOptions才有意义
	// watchOptions:{
	// 	//默认为空，不见听的文件或文件夹，支持正则匹配
	// 	ignored:/node_modules/,
	// 	//监听到变化有会等300ms再去执行，默认300ms
	// 	aggregateTimeout:300,
	// 	//判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
	// 	poll:1000
	// },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ].concat(htmlWebpackPlugins),
  devServer:{
    contentBase:path.join(__dirname, 'dist'),
    hot:true,
    stats:'errors-only'
  },
  devtool:'source-map' // 调试用
}