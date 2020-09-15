/**
 * @intro: 服务端打包配置.
 */
const path = require('path');
const merge = require('webpack-merge').default;
const WebpackDynamicEntryPlugin = require('webpack-dynamic-entry-plugin');
const WebpackNodeExternals = require('webpack-node-externals');
const WebpackBarPlugin = require('webpackbar');
const webpackBaseConfig = require('./webpack.base.config');
const { formatEntryName, styleLoaders, assetsLoaders } = require('./utils');

const resolve = (dir) => path.join(__dirname, '..', dir);

const webpackConfig = merge(webpackBaseConfig, {
  target: 'node',
  entry: WebpackDynamicEntryPlugin.getEntry({
    pattern: [
      resolve('src/pages/**/index.{js,jsx}'),
      resolve('src/pages/_document.{js,jsx}')
    ],
    generate: entry => {
      return Object.assign.apply(Object, Object.keys(entry)
        .map(name => {
          const entryName = `pages/${formatEntryName(name)}`;
          const entryFile = entry[name];
          return { [entryName]: entryFile };
        }));
    }
  }),
  output: {
    filename: '[name].react',
    chunkFilename: '[name].react',
    libraryTarget: 'commonjs2'
  },
  externals: WebpackNodeExternals(),
  module: {
    rules: [
      ...styleLoaders({
        ignore: true
      }),
      ...assetsLoaders({ emitFile: false })
    ]
  },
  plugins: [
    new WebpackBarPlugin({
      name: 'server',
      color: 'orange'
    })
  ]
});

module.exports = webpackConfig;
