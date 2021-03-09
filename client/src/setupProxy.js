const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
  app.use(
    '/rtc',
    createProxyMiddleware({
      target: 'http://localhost:443',
      changeOrigin: true,
    })
  );
}; 