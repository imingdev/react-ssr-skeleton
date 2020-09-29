const path = require('path');

const resolve = (dir) => path.join(__dirname, '..', dir);
module.exports = {
  // Paths
  clientDistPath: resolve('../server/app'),
  serverDistPath: resolve('../server/app/views'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  build: {
    pattern: resolve('src/pages/**/index.{js,jsx}')
  },
  dev: {
    port: 8898,
    host: 'localhost'
  }
};
