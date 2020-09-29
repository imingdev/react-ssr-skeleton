/**
 * @intro: 服务端打包配置.
 */
process.env.BUILD_ENV = 'server';

const path = require('path');
const merge = require('webpack-merge').default;
const WebpackDynamicEntryPlugin = require('webpack-dynamic-entry-plugin');
const WebpackNodeExternals = require('webpack-node-externals');
const WebpackBarPlugin = require('webpackbar');
const webpackBaseConfig = require('./webpack.base.config');
const config = require('./config');
const { styleLoaders, assetsLoaders, formatEntryName } = require('./utils');

const resolve = (dir) => path.join(__dirname, '..', dir);

const webpackConfig = merge(webpackBaseConfig, {
  name: 'server',
  target: 'node',
  entry: WebpackDynamicEntryPlugin.getEntry({
    pattern: [
      resolve('src/pages/**/index.{js,jsx}'),
      resolve('src/pages/**/{_document,_app}.{js,jsx}')
    ],
    generate: entry => Object.assign.apply(Object, Object.keys(entry)
      .map(name => ({ [formatEntryName(name)]: entry[name] })))
  }),
  output: {
    path: config.serverDistPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: styleLoaders({
      useIgnore: true
    })
      .concat(assetsLoaders({ emitFile: false }))
  },
  externals: WebpackNodeExternals(),
  plugins: [
    new WebpackBarPlugin({
      name: 'server',
      color: 'orange'
    })
  ]
});

module.exports = webpackConfig;
