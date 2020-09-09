/**
 * @intro: page-loader.
 */
const loaderUtils = require('loader-utils');
const {formatFilePath} = require('../utils');

module.exports = function () {
  const {main} = loaderUtils.getOptions(this);
  const {resourcePath} = this;
  const formatResPath = formatFilePath(resourcePath);
  const formatMainPath = formatFilePath(main);

  return `
    import AppMain from '${formatMainPath}';
    import AppPage from '${formatResPath}';

    setTimeout(function () {
      AppMain(AppPage);
    }, 0);
  `
};
