const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const isProductionMode = process.env.NODE_ENV === 'production';
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
module.exports = {
  entry: './test/mvvmTest.ts',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: isProductionMode ? './' : '/', //热更新启动需要命中文件夹，否则用打包完成的文件，所有pubulicPath不能是'./'
    filename: 'vue.js',
    chunkFilename: 'js/[name].[hash].chunk.js',
    environment: {
      arrowFunction:false
    }
  },
  module: {
    rules: [
      // 兼容es5
      // {
      //   test: /\.ts$/i,
      //   exclude: /(node_modules|bower_components)/,
      //   use: [{
      //       loader: 'babel-loader',
      //       options: {
      //         presets: [
      //           ['@babel/preset-env',
      //             {
      //               useBuiltIns: 'usage',
      //               corejs: {
      //                 version: 3
      //               },
      //               targets: {
      //                 chrome: '60',
      //                 firefox: '60',
      //                 ie: "11",
      //                 safari: '10',
      //                 edge: '17'
      //               }
      //             }
      //           ]
      //         ],
      //       }
      //     },
      //     "ts-loader"

      //   ]
      // },
      {
        test: /\.ts$/i,
        exclude: /(node_modules|bower_components)/,
        use:[ "ts-loader"]
         

        
      },


    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html',
    }), //创建index.html文件
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    }
  }



}