const baseConfig = require('./webpack.base')
const {merge} = require('webpack-merge')
const {
    CleanWebpackPlugin
  } = require('clean-webpack-plugin')
const path = require('path');
// process.env.NODE_ENV = 'production'

const prodConfig = {
    mode: 'production',
    // devtool:'inline-cheap-source-map',
   

    

  plugins:[
    new CleanWebpackPlugin(), //在打包前清理旧的打包文件

  ]




}
module.exports = merge(baseConfig,prodConfig)
