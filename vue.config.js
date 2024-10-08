// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://fakestoreapi.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
