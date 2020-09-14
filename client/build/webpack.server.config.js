/**
 * @intro: 服务端打包配置.
 */
process.env.BUILD_ENV = 'server';

const merge = require('webpack-merge').default;
const webpackBaseConfig = require('./webpack.base.config');
const WebpackNodeExternals = require('webpack-node-externals');
const WebpackBarPlugin = require('webpackbar');

const webpackConfig = merge(webpackBaseConfig, {
  target: 'node',
  output: {
    filename: '[name].react',
    chunkFilename: '[name].react',
    libraryTarget: 'commonjs2'
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
