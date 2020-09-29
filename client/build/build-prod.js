const path = require('path');
const webpack = require('webpack');
const webpackClientConfig = require('./webpack.client.config');
const webpackServerConfig = require('./webpack.server.config');
const { deleteBuildFile } = require('./utils');

deleteBuildFile()
  .then(() => webpack([webpackClientConfig, webpackServerConfig]))
  .then((compiler) => compiler.run());

