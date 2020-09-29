const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./config');
const webpackClientConfig = require('./webpack.client.config');
const webpackServerConfig = require('./webpack.server.config');

const serverCompiler = webpack(webpackServerConfig);
const clientCompiler = webpack(webpackClientConfig);

// Client Build, watch is started by webpack-dev-server
new WebpackDevServer(clientCompiler, {
  publicPath: webpackClientConfig.output.publicPath,
  clientLogLevel: 'warning',
  contentBase: false,
  compress: true,
  quiet: true,
  hot: true,
  port: config.dev.port,
  host: config.dev.host,
  disableHostCheck: true,
  proxy: config.dev.proxy
})
  .listen(config.dev.port, config.dev.host);

// Server, build and watch for changes
serverCompiler.watch(config.build.pages, err => {
  if (err) throw err;
});
