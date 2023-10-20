const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    // 平台请求
    createProxyMiddleware('/platApi', {
      target: 'http://localhost:8001/jxmarket-api/',
      ws: true,
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/platApi': '',
      },
      onProxyRes: function (proxyRes, req, res) {
        console.log('api:', req.url)
      },
    })
  )
}
