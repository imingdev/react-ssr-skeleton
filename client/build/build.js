process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const consola = require('consola');
const rm = require('rimraf');
const webpackBaseConfig = require('./webpack.base.config');
const webpackClientConfig = require('./webpack.client.config');
const webpackServerConfig = require('./webpack.server.config');

const pathJoin = dir => path.join(webpackBaseConfig.output.path, dir);
const rmDir = dir => rm(dir, err => {
  if (err) throw err;
});

rmDir(pathJoin('pages'));
rmDir(pathJoin('router/ssr.js'));
rmDir(pathJoin('static'));

webpack([webpackClientConfig, webpackServerConfig], err => {
  if (err) throw err;
  consola.success('Build complete.');
});
