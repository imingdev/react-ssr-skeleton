/**
 * @intro: webpack配置基类.
 */
const path = require('path');
const WebpackDynamicEntryPlugin = require('webpack-dynamic-entry-plugin');
const DotEnvWebpackPlugin = require('dotenv-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

const isProduction = NODE_ENV === 'production';

const resolve = (dir) => path.join(__dirname, '..', dir);

const webpackConfig = {
  mode: NODE_ENV,
  context: resolve('/'),
  output: {
    path: resolve('../server'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    }, {
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      options: {
        compact: false
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve('src'),
      assets: resolve('src/assets'),
      common: resolve('src/common'),
      pages: resolve('src/pages'),
      components: resolve('src/components')
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
  stats: false,
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
        }
      },
      sourceMap: false,
      parallel: true
    })
  );
  optimization.minimizer = minimizer;
  webpackConfig.optimization = optimization;
}

module.exports = webpackConfig;
