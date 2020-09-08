/**
 * @intro: page-loader.
 */
const loaderUtils = require('loader-utils');
const {formatFilePath} = require('../utils');

module.exports = function (source) {
  const {main} = loaderUtils.getOptions(this);
  const {resourcePath} = this;
  const formatResPath = formatFilePath(resourcePath);
  const formatMainPath = formatFilePath(main);

  const mainKey = `AppMain_${Date.now()}`;
  const pageKey = `AppPage_${Date.now()}`;

  return `
    import ${mainKey} from '${formatMainPath}';
    import ${pageKey} from '${formatResPath}';

    ${source}

    ${mainKey}(${pageKey});
  `
};
