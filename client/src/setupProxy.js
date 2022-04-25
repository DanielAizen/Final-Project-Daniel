const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api',{
      target: 'http://localhost:5002',
      changeOrigin: true,
      })
  );
  app.use(
    createProxyMiddleware('/honeypot/get_all',{
      target: 'http://127.0.0.1:80',
      changeOrigin: true
    })
  );
};