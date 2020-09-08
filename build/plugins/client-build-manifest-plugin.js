/**
 * @intro: 客户端页面构建资源插件.
 */
const {formatFilePath, formatEntryName, formatOutputAssets} = require('../utils');
const {CLIENT_BUILD_MANIFEST, SERVER_DIRECTORY} = require('../constants');

module.exports = class ClientPagesManifestPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap(this.constructor.name, this.hookCallback);
  }

  hookCallback(compilation) {
    const pages = {};
    const publicPath = compilation.options.output.publicPath;

    for (const entryPoint of compilation.entrypoints.values()) {
      const files = entryPoint.getFiles().map(file => `${publicPath}${formatFilePath(file)}`);
      const js = files.filter(row => /\.js$/.test(row));
      const css = files.filter(row => /\.css$/.test(row));

      pages[formatEntryName(entryPoint.name)] = {
        js,
        css
      }
    }

    compilation.assets[`${SERVER_DIRECTORY}/${CLIENT_BUILD_MANIFEST}`] = formatOutputAssets(pages);
  }
};
