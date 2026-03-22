const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://127.0.0.1:8080',
      changeOrigin: true,
      secure: false,
    })
  );
  app.use(
    '/spotify',
    createProxyMiddleware({
      target: 'https://127.0.0.1:8080',
      changeOrigin: true,
      secure: false,
    })
  );
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'https://127.0.0.1:8080',
      changeOrigin: true,
      secure: false,
    })
  );
};
