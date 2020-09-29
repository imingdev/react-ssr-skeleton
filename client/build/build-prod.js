const webpack = require('webpack');
const webpackClientConfig = require('./webpack.client.config');
const webpackServerConfig = require('./webpack.server.config');

webpack([webpackClientConfig, webpackServerConfig])
  .run();

