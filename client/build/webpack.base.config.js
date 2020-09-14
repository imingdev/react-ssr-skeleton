/**
 * @intro: webpack配置基类.
 */
const path = require('path');
const WebpackDynamicEntryPlugin = require('webpack-dynamic-entry-plugin');
const DotEnvWebpackPlugin = require('dotenv-webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { styleLoaders, assetsLoaders, formatEntryName } = require('./utils');

const NODE_ENV = process.env.NODE_ENV || 'development';
const { BUILD_ENV } = process.env;

const isClient = BUILD_ENV === 'client';
const isProduction = NODE_ENV === 'production';

const resolve = (dir) => path.join(__dirname, '..', dir);

const webpackConfig = {
  mode: NODE_ENV,
  context: resolve('/'),
  entry: WebpackDynamicEntryPlugin.getEntry({
    pattern: [
      resolve('src/pages/**/index.{js,jsx}'),
      !isClient && resolve('src/pages/_document.{js,jsx}')
    ].filter(Boolean),
    generate: entry => {
      const loaderPath = path.join(__dirname, './loaders/client-pages-loader');
      return Object.assign.apply(Object, Object.keys(entry)
        .map(name => {
          const entryName = `pages/${formatEntryName(name)}`;
          const entryFile = entry[name];
          if (isClient) return { [entryName]: `${loaderPath}!${entryFile}` };
          return { [entryName]: entryFile };
        }));
    }
  }),
  output: {
    path: resolve('../server'),
    publicPath: '/'
  },
  module: {
    rules: [
      ...styleLoaders({
        sourceMap: !isProduction,
        extract: isClient
      }),
      ...assetsLoaders(),
      ...[{
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }, {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        query: {
          compact: false
        }
      }]
    ]
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
