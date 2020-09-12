/**
 * @intro: 服务端打包配置.
 */
process.env.BUILD_ENV = 'server';

const path = require('path');
const merge = require('webpack-merge').default;
const WebpackDynamicEntryPlugin = require('webpack-dynamic-entry-plugin');
const WebpackNodeExternals = require('webpack-node-externals');
const WebpackBarPlugin = require('webpackbar');
const { GLOB_PAGES_PATTERN } = require('./constants');
const webpackBaseConfig = require('./webpack.base.config');

const resolve = (dir) => path.join(__dirname, '..', dir);

const webpackConfig = merge(webpackBaseConfig, {
  target: 'node',
  entry: WebpackDynamicEntryPlugin.getEntry(
    [resolve(GLOB_PAGES_PATTERN), resolve('src/pages/{_document,_app}.{js,jsx}')],
    {},
    (name, file) => ({
      name: `pages/${name}`,
      path: file
    })
  ),
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: WebpackNodeExternals(),
  plugins:[
    new WebpackBarPlugin({
      name: 'server',
      color: 'orange'
    })
  ]
});

module.exports = webpackConfig;
