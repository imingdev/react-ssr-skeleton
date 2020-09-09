/**
 * @intro: 客户端打包配置.
 */
process.env.BUILD_ENV = 'client';

const path = require('path');
const merge = require('webpack-merge').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackDynamicEntryPlugin = require('webpack-dynamic-entry-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const {GLOB_PAGES_PATTERN, CLIENT_BUILD_OUTPUT, CLIENT_MAIN_DIRECTORY} = require('./constants');
const webpackBaseConfig = require('./webpack.base.config');
const ClientBuildManifestPlugin = require('./plugins/client-build-manifest-plugin');
const utils = require('./utils');

const NODE_ENV = process.env.NODE_ENV || 'development';

const isProduction = NODE_ENV === 'production';

const resolve = (dir) => path.join(__dirname, '..', dir);

const webpackConfig = merge(webpackBaseConfig, {
  entry: WebpackDynamicEntryPlugin.getEntry(
    resolve(GLOB_PAGES_PATTERN),
    {},
    (name, file) => ({
      name: `/${name}`,
      path: `${path.join(__dirname, './loaders/client-pages-loader')}?main=${resolve(CLIENT_MAIN_DIRECTORY)}!${file}`
    })
  ),
  output: {
    path: CLIENT_BUILD_OUTPUT,
    filename: utils.assetsPath('js/[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[chunkhash:8].js')
  },
  plugins: [
    new ClientBuildManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[contenthash:8].css'),
      chunkFilename: utils.assetsPath('css/[contenthash:8].css')
    })
  ]
});

if (isProduction) {
  const optimization = webpackConfig.optimization || {};
  const minimizer = optimization.minimizer || [];
  minimizer.push(
    new OptimizeCSSPlugin({
      cssProcessorOptions: {safe: true}
    })
  );
  optimization.minimizer = minimizer;
  webpackConfig.optimization = optimization;
}

module.exports = webpackConfig;
