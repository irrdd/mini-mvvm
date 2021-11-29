const baseConfig = require('./webpack.base')
const {merge} = require('webpack-merge')
// process.env.NODE_ENV = 'development'
const devConfig =  {
    mode: 'development',
    devtool:'eval-cheap-module-source-map',
    devServer: {
        static: './dist',
        open:true,
        compress: true, //压缩
        allowedHosts: 'all', //允许所有ip地址请求
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin()
    ],
}
module.exports = merge(baseConfig,devConfig)