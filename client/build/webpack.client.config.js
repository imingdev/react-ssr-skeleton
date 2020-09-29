/**
 * @intro: 客户端打包配置.
 */
process.env.BUILD_ENV = 'client';

const path = require('path');
const merge = require('webpack-merge').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackDynamicEntryPlugin = require('webpack-dynamic-entry-plugin');
const WebpackBarPlugin = require('webpackbar');
const ClientManifestPlugin = require('./plugins/client-manifest-plugin');
const webpackBaseConfig = require('./webpack.base.config');
const { styleLoaders, assetsLoaders, assetsPath } = require('./utils');
const config = require('./config');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';

const webpackConfig = merge(webpackBaseConfig, {
  name: 'client',
  entry: WebpackDynamicEntryPlugin.getEntry({
    pattern: config.build.pattern,
    generate: (entry) => Object.assign.apply(Object, Object.keys(entry)
      .map(name => {
        const loaderPath = path.join(__dirname, 'loaders/client-pages-loader.js');
        return { [name]: `${loaderPath}!${entry[name]}` };
      }))
  }),
  output: {
    path: config.clientDistPath,
    filename: isDevelopment ? '[name].js' : assetsPath('js/[chunkhash:8].js'),
    chunkFilename: isDevelopment ? '[name].js' : assetsPath('js/[chunkhash:8].js')
  },
  module: {
    rules: styleLoaders({
      sourceMap: isDevelopment,
      useIgnore: false,
      extract: true
    })
      .concat(assetsLoaders({ emitFile: true }))
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : assetsPath('css/[contenthash:8].css'),
      chunkFilename: isDevelopment ? '[name].css' : assetsPath('css/[contenthash:8].css')
    }),
    new WebpackBarPlugin({
      name: 'client',
      color: 'green'
    }),
    new ClientManifestPlugin({
      fileName: '../config/manifest.json'
    })
  ]
});

module.exports = webpackConfig;