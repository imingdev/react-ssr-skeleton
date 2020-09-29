const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const del = require('del');
const config = require('./config');

const resolve = (dir) => path.join(__dirname, '..', dir);

exports.assetsPath = (_path) => path.posix.join(config.assetsSubDirectory, _path);

exports.cssLoaders = (options = {}) => {

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  // generate loader string to be used with extract text plugin
  const generateLoaders = (loader, loaderOptions) => {
    const loaders = [cssLoader, postcssLoader];

    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: {
          ...loaderOptions,
          sourceMap: options.sourceMap
        }
      });
    }
    if (options.extract) return [MiniCssExtractPlugin.loader].concat(loaders);

    return loaders;
  };

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  };
};

exports.styleLoaders = (options = {}) => {
  const output = [];
  const loaders = exports.cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp(`\\.${extension}$`),
      use: options.useIgnore ? [resolve('build/loaders/ignore-loader.js')] : loader
    });
  }

  return output;
};

exports.assetsLoaders = ({ emitFile = true } = {}) => {
  const loader = 'url-loader';

  return [{
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader,
    options: {
      limit: 1000,
      emitFile,
      name: exports.assetsPath('images/[hash:8].[ext]')
    }
  }, {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader,
    options: {
      limit: 1000,
      emitFile,
      name: exports.assetsPath('images/[hash:8].[ext]')
    }
  }, {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader,
    options: {
      limit: 1000,
      emitFile,
      name: exports.assetsPath('fonts/[hash:8].[ext]')
    }
  }];
};

// format file path
exports.formatFilePath = (_path) => {
  const sep = path.sep;
  if (_path.includes(sep)) {
    return _path.split(sep)
      .filter(Boolean)
      .join('/');
  }

  return _path;
};

// format webpack entry name
exports.formatEntryName = (_name) => exports.formatFilePath(_name)
  .replace(new RegExp('/index$'), '');

// delete build dir
exports.deleteBuildFile = () => del([
  resolve('../server/app/static'),
  resolve('../server/app/views'),
  resolve('../server/config/manifest.json')
], {
  force: true
});
