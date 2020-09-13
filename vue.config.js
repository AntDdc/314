const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
    devServer: {
      host: '192.168.0.100',
      port: 9999,
    proxy: {
        '/xboot': {
            target: 'http://192.168.2.193:7777',  // 请求本地 需要xboot后台项目
            ws: false
        },
        '/api': {
          target: 'http://192.168.2.193:7777',
          ws: false
        },
        '/scratch-gui/': {
          target: 'http://192.168.2.242:8601', // 换成正确的服务器域名
          changeOrigin: true,
          pathRewrite: {
            '^/scratch-gui/': ''
          }
        }

    },
  },
  lintOnSave: true
}
