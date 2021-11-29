const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const isProductionMode = process.env.NODE_ENV === 'production';
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: isProductionMode ? './' : '/', //热更新启动需要命中文件夹，否则用打包完成的文件，所有pubulicPath不能是'./'
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].chunk.js'
  },
  module: {
    rules: [
      // 兼容es5
      {
        test: /\.js$/i,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env',
              {
                useBuiltIns:'usage',
                corejs:{
                  version:3
                },
                targets:{
                  chrome:'60',
                  firefox:'60',
                  ie:"11",
                  safari:'10',
                  edge:'17'
                }
              }
            ]
            ],
          }
        },
        ]
      },
   
     
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      },
      isBrowser: false,
    }), //创建index.html文件
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    }
  }



}