/**
 * @intro: webpack配置基类.
 */
const path = require('path');
const WebpackDynamicEntryPlugin = require('webpack-dynamic-entry-plugin');
const DotEnvWebpackPlugin = require('dotenv-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {styleLoaders, assetsLoaders} = require('./utils');
const {CLIENT_DIRECTORY} = require('./constants');

const NODE_ENV = process.env.NODE_ENV || 'development';
const BUILD_ENV = process.env.BUILD_ENV;

const isClient = BUILD_ENV === 'client';
const isProduction = NODE_ENV === 'production';

const resolve = (dir) => path.join(__dirname, '..', dir);

const webpackConfig = {
  mode: NODE_ENV,
  context: resolve('/'),
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      ...styleLoaders({sourceMap: !isProduction, extract: isClient}),
      ...assetsLoaders(),
      ...[{
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre'
      }, {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
      }]
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve(CLIENT_DIRECTORY),
      assets: resolve(`${CLIENT_DIRECTORY}/assets`),
      common: resolve(`${CLIENT_DIRECTORY}/common`),
      pages: resolve(`${CLIENT_DIRECTORY}/pages`),
      components: resolve(`${CLIENT_DIRECTORY}/components`),
    },
  },
  plugins: [
    new DotEnvWebpackPlugin({
      path: '.env',
      silent: true, // hide any errors
      systemvars: true,
      defaults: `.env.${NODE_ENV}`
    }),
    new WebpackDynamicEntryPlugin()
  ],
  performance: {
    hints: false
  },
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    entrypoints: false
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};

if (isProduction) {
  const optimization = webpackConfig.optimization || {};
  const minimizer = optimization.minimizer || [];
  minimizer.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false
        },
        compress: {
          drop_debugger: true,
          drop_console: true
        },
      },
      sourceMap: false,
      parallel: true
    })
  );
  optimization.minimizer = minimizer;
  webpackConfig.optimization = optimization;
}

module.exports = webpackConfig;
