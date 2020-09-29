/**
 * @intro: page-loader.
 */
const path = require('path');
const { formatFilePath } = require('../utils');

const resolve = (dir) => path.join(__dirname, '..', dir);

module.exports = function () {
  const { resourcePath } = this;
  const currentComponentPath = formatFilePath(resourcePath);
  const mainComponentPath = formatFilePath(resolve('../src/main'));
  const appComponentPath = formatFilePath(resolve('../src/pages/_app'));

  return `
    import App from '${appComponentPath}';
    import AppMain from '${mainComponentPath}';
    import AppPage from '${currentComponentPath}';

    setTimeout(function () {
      AppMain(App, AppPage);
    }, 0);
  `;
};
