/**
 * @intro: page-loader.
 */
const {formatFilePath} = require('../utils');

module.exports = function () {
  const {resourcePath} = this;
  const formatResPath = formatFilePath(resourcePath);

  return `
    import AppMain from '@/main';
    import AppPage from '${formatResPath}';

    setTimeout(function () {
      AppMain(AppPage);
    }, 0);
  `
};
