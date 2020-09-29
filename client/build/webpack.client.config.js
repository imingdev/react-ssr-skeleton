/**
 * @intro: 客户端打包配置.
 */
process.env.BUILD_ENV = 'client';

const path = require('path');
const merge = require('webpack-merge').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackDynamicEntryPlugin = require('webpack-dynamic-entry-plugin');
const WebpackBarPlugin = require('webpackbar');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ip = require('ip');
const ClientManifestPlugin = require('./plugins/client-manifest-plugin');
const webpackBaseConfig = require('./webpack.base.config');
const { styleLoaders, assetsLoaders, assetsPath } = require('./utils');
const config = require('./config');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';

const webpackConfig = merge(webpackBaseConfig, {
  name: 'client',
  devtool: isDevelopment ? 'source-map' : false,
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

if (isDevelopment) {
  webpackConfig.plugins.push(
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          'App running at:',
          `- Local:   http://localhost:${config.dev.port}`,
          `- Network: http://${ip.address()}:${config.dev.port}`
        ],
        notes: [
          'Note that the development build is not optimized.',
          'To create a production build, run npm run build:prod.'
        ]
      }
    })
  );
}

module.exports = webpackConfig;
