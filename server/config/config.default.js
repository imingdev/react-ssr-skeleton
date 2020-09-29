const path = require('path');

module.exports = app => {
  const config = {};

  const resolve = dir => path.join(app.baseDir, dir);

  config.keys = app.name;

  config.multipleStatic = [{
    prefix: '/public',
    dir: resolve('app/public'),
  }, {
    prefix: '/static',
    dir: resolve('app/static'),
  }];

  config.view = {
    root: resolve('app/views'),
    defaultViewEngine: 'react',
    defaultExtension: '.js',
    mapping: {
      '.js': 'react',
    },
  };

  config.react = {
    doctype: '<!doctype html>',
    manifest: resolve('config/manifest.json'),
    document: resolve('app/views/_document.js'),
    app: resolve('app/views/_app.js'),
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  };

  return config;
};
