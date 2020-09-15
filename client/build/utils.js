const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.assetsPath = _path => path.posix.join('static', _path);

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
  generateLoaders = (loader, loaderOptions) => {
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
      name: exports.assetsPath('media/[hash:8].[ext]')
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

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = (options = {}) => {
  const output = [];
  const loaders = exports.cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp(`\\.${extension}$`),
      use: options.ignore ? ['ignore-loader'] : loader
    });
  }

  return output;
};

// 格式化路径
exports.formatFilePath = (_path) => {
  const sep = path.sep;
  if (_path.includes(sep)) {
    return _path.split(sep)
      .filter(Boolean)
      .join('/');
  }

  return _path;
};

// 格式化entry的名字
exports.formatEntryName = (_name) => {
  const key = _name
    .replace(new RegExp('/index$'), '');

  return key;
};

// 输出到资源
exports.formatOutputAssets = output => {
  const out = JSON.stringify(output, null, 2);

  return {
    source: () => out,
    size: () => out.length
  };
};
;
