const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {PAGES_DIRECTORY, CLIENT_STATIC_FILES_PATH, FILE_IMAGE_RULES, FILE_MEDIA_RULES, FILE_FONT_RULES} = require('./constants');

const BUILD_ENV = process.env.BUILD_ENV;

const isServer = BUILD_ENV === 'server';

exports.assetsPath = _path => path.posix.join(CLIENT_STATIC_FILES_PATH, _path);

exports.cssLoaders = (sourceMap) => {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap,
    },
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap,
    },
  };

  // generate loader string to be used with extract text plugin
  generateLoaders = (loader, loaderOptions) => {
    const loaders = [cssLoader, postcssLoader];

    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: {...loaderOptions, sourceMap},
      });
    }
    if (isServer) return loaders;

    return [MiniCssExtractPlugin.loader].concat(loaders);
  };

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus'),
  };
};

exports.assetsLoaders = () => [FILE_IMAGE_RULES, FILE_MEDIA_RULES, FILE_FONT_RULES].map(regArr => ({
  test: new RegExp(`\\.(${regArr.join('|')})$`),
  loader: 'url-loader',
  options: {
    limit: 1000,
    name: exports.assetsPath('images/[hash:8].[ext]')
  }
}));

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = (sourceMap) => {
  const output = [];
  const loaders = exports.cssLoaders(sourceMap);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp(`\\.${extension}$`),
      use: isServer ? 'ignore-loader' : loader,
    });
  }

  return output;
};

// 格式化路径
exports.formatFilePath = (_path) => {
  const sep = path.sep;
  if (_path.includes(sep)) return _path.split(sep).filter(Boolean).join('/');

  return _path
};

// 格式化entry的名字
exports.formatEntryName = (_name) => {
  const key = _name
    .replace(new RegExp(`^${PAGES_DIRECTORY}`), '')
    .replace(new RegExp('/index$'), '');

  return key || '/'
};

// 输出到资源
exports.formatOutputAssets = output => {
  const out = JSON.stringify(output, null, 2);

  return {
    source: () => out,
    size: () => out.length
  }
};
