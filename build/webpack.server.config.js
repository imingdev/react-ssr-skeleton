/**
 * @intro: 服务端打包配置.
 */
const path = require('path');
const merge = require('webpack-merge').default;
const WebpackDynamicEntryPlugin = require('webpack-dynamic-entry-plugin');
const {CLIENT_DIRECTORY, PAGES_DIRECTORY, BLOCKED_PAGES, GLOB_PAGES_PATTERN} = require('./constants');
const webpackBaseConfig = require('./webpack.base.config');
const WebpackNodeExternals = require('webpack-node-externals');
const ServerPagesManifestPlugin = require('./plugins/server-pages-manifest-plugin');

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
    path: resolve('dist/server'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: WebpackNodeExternals(),
  plugins: [
    new ServerPagesManifestPlugin()
  ]
})

module.exports = webpackConfig
