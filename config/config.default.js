const path = require('path');
const { name } = require('../package');

module.exports = (app) => {
  const pathJoinAppDir = (dir) => path.join(app.baseDir, 'app', dir);

  const config = {};

  config.keys = name;

  config.multipleStatic = [{
    prefix: '/public',
    dir: pathJoinAppDir('public')
  }, {
    prefix: '/static',
    dir: pathJoinAppDir('static')
  }];

  config.view = {
    root: pathJoinAppDir('pages'),
    defaultExtension: '.js',
    mapping: {
      '.js': 'react',
      '.jsx': 'react'
    }
  };
  config.react = {
    doctype: '<!doctype html>',
    manifest: path.join(__dirname, './resource-manifest.json'),
    document: pathJoinAppDir('pages/_document.js'),
    app: pathJoinAppDir('pages/_app.js')
  };

  return config;
};
