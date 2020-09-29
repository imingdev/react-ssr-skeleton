const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const globBase = require('glob-base');
const config = require('./config');
const webpackClientConfig = require('./webpack.client.config');
const webpackServerConfig = require('./webpack.server.config');

const serverCompiler = webpack(webpackServerConfig);
const clientCompiler = webpack(webpackClientConfig);

// Client Build, watch is started by webpack-dev-server
new WebpackDevServer(clientCompiler, {
  publicPath: webpackClientConfig.output.publicPath,
  quiet: true,
  port: config.dev.port,
  host: config.dev.host,
  disableHostCheck: true
})
  .listen(config.dev.port, config.dev.host);

// Server, build and watch for changes
serverCompiler.watch(globBase(config.build.pattern).base, err => {
  if (err) throw err;
});
