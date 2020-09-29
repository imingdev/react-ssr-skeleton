/**
 * @intro: webpack配置基类.
 */
const path = require('path');
const WebpackDynamicEntryPlugin = require('webpack-dynamic-entry-plugin');
const DotEnvWebpackPlugin = require('dotenv-webpack');
const config = require('./config');

const NODE_ENV = process.env.NODE_ENV || 'development';

const resolve = (dir) => path.join(__dirname, '..', dir);

module.exports = {
  mode: NODE_ENV,
  context: resolve('/'),
  output: {
    publicPath: config.assetsPublicPath
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      include: [
        resolve('build/loaders'),
        resolve('src'),
        resolve('node_modules/webpack-dev-server/client')
      ],
      options: {
        compact: false
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve('src')
    }
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
    child_process: 'empty'
  }
};
