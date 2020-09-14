/**
 * @intro: 客户端打包配置.
 */
process.env.BUILD_ENV = 'client';

const path = require('path');
const merge = require('webpack-merge').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackBarPlugin = require('webpackbar');
const WebpackServerRouterPlugin = require('./plugins/webpack-server-router-plugin');
const webpackBaseConfig = require('./webpack.base.config');
const utils = require('./utils');

const NODE_ENV = process.env.NODE_ENV || 'development';

const isProduction = NODE_ENV === 'production';

const resolve = (dir) => path.join(__dirname, '..', dir);

const webpackConfig = merge(webpackBaseConfig, {
  output: {
    filename: utils.assetsPath('js/[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[chunkhash:8].js')
  },
  plugins: [
    new WebpackServerRouterPlugin({
      fileName: 'router/ssr.js',
      publicPath: webpackBaseConfig.output.publicPath
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[contenthash:8].css'),
      chunkFilename: utils.assetsPath('css/[contenthash:8].css')
    }),
    new CopyWebpackPlugin([{
      from: resolve('static'),
      to: 'static',
      ignore: ['.*']
    }]),
    new WebpackBarPlugin({
      name: 'client',
      color: 'green'
    })
  ]
});

if (isProduction) {
  const optimization = webpackConfig.optimization || {};
  const minimizer = optimization.minimizer || [];
  minimizer.push(
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true }
    })
  );
  optimization.minimizer = minimizer;
  webpackConfig.optimization = optimization;
}

module.exports = webpackConfig;
