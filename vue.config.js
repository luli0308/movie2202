const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置开发者服务器
  devServer: {
    // 端口
    // port: 8080,
    // // 打开浏览器
    // open: true,
    // // 域名主机
    // host:'localhost',
    // 代理服务器
    proxy: {
      // 需要代理的地址 添加一个标识信息
      '/api': {
        // 真实服务器地址 前缀部分
        target: 'https://api.iynn.cn/film/api/v1',
        // 是否Origin 改变   本地服务器和接口服务器域名不一样
        changeOrigin: true,
        // http false https[ssl加密和验证]  true
        secure: true,
        // 路径重写
        // 真实接口地址：https://api.iynn.cn/film/api/v1/getNowPlayingFilmList
        // 通过proxy代理服务器转发后:https://api.iynn.cn/film/api/v1/api/getNowPlayingFilmList
        pathRewrite: {
          // 替换路径
          // 匹配路径:替换为
          '^/api': ''
        }
      }
    }
  }
})
