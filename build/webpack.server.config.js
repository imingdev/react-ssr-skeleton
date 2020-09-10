/**
 * @intro: 服务端打包配置.
 */
process.env.BUILD_ENV = 'server';

const path = require('path');
const merge = require('webpack-merge').default;
const WebpackDynamicEntryPlugin = require('webpack-dynamic-entry-plugin');
const {CLIENT_DIRECTORY, SERVER_DIRECTORY, PAGES_DIRECTORY, BLOCKED_PAGES, GLOB_PAGES_PATTERN, SERVER_BUILD_OUTPUT} = require('./constants');
const webpackBaseConfig = require('./webpack.base.config');
const WebpackNodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ServerPagesManifestPlugin = require('./plugins/server-pages-manifest-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = NODE_ENV === 'production';

const resolve = (dir) => path.join(__dirname, '..', dir);

const webpackConfig = merge(webpackBaseConfig, {
  target: 'node',
  entry: WebpackDynamicEntryPlugin.getEntry(
    BLOCKED_PAGES
      .map(row => resolve(`${CLIENT_DIRECTORY}/${PAGES_DIRECTORY}/${row}.{js,jsx}`))
      .concat([resolve(GLOB_PAGES_PATTERN)]),
    {},
    (name, file) => ({name: `${PAGES_DIRECTORY}/${name}`, path: file})
  ),
  output: {
    path: SERVER_BUILD_OUTPUT,
    filename: '[name].js',
    chunkFilename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: WebpackNodeExternals(),
  plugins: [
    new ServerPagesManifestPlugin()
  ]
});

if (isProduction) {
  webpackConfig.plugins.push(
    new CopyWebpackPlugin([{
      from: resolve(SERVER_DIRECTORY),
      to: './',
      ignore: ['.*']
    }, {
      from: resolve('package.json'),
      to: '../'
    }])
  )
}

module.exports = webpackConfig;
