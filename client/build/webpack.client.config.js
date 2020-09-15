/**
 * @intro: 客户端打包配置.
 */
const path = require('path');
const merge = require('webpack-merge').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackDynamicEntryPlugin = require('webpack-dynamic-entry-plugin');
const WebpackBarPlugin = require('webpackbar');
const WebpackServerRouterPlugin = require('./plugins/webpack-server-router-plugin');
const webpackBaseConfig = require('./webpack.base.config');
const { assetsPath, formatEntryName, styleLoaders, assetsLoaders } = require('./utils');

const NODE_ENV = process.env.NODE_ENV || 'development';

const isProduction = NODE_ENV === 'production';

const resolve = (dir) => path.join(__dirname, '..', dir);

const webpackConfig = merge(webpackBaseConfig, {
  target: 'web',
  entry: WebpackDynamicEntryPlugin.getEntry({
    pattern: resolve('src/pages/**/index.{js,jsx}'),
    generate: entry => {
      const loaderPath = path.join(__dirname, './loaders/client-pages-loader');
      return Object.assign.apply(Object, Object.keys(entry)
        .map(name => {
          const entryName = `pages/${formatEntryName(name)}`;
          const entryFile = entry[name];

          return { [entryName]: `${loaderPath}!${entryFile}` };
        }));
    }
  }),
  output: {
    filename: assetsPath('js/[chunkhash:8].js'),
    chunkFilename: assetsPath('js/[chunkhash:8].js')
  },
  module: {
    rules: [
      ...styleLoaders({
        sourceMap: !isProduction,
        extract: true
      }),
      ...assetsLoaders()
    ]
  },
  plugins: [
    new WebpackServerRouterPlugin({
      fileName: 'router/ssr.js',
      publicPath: webpackBaseConfig.output.publicPath
    }),
    new MiniCssExtractPlugin({
      filename: assetsPath('css/[contenthash:8].css'),
      chunkFilename: assetsPath('css/[contenthash:8].css')
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
