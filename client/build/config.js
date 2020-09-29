const { join } = require('path');

const resolve = (dir) => join(__dirname, '..', dir);
const pagesDir = resolve('src/pages');

module.exports = {
  // Paths
  clientDistPath: resolve('../server/app'),
  serverDistPath: resolve('../server/app/views'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  build: {
    pattern: join(pagesDir, '**/index.{js,jsx}'),
    pages: pagesDir
  },
  dev: {
    port: 8898,
    host: 'localhost',
    proxy: {}
  }
};
