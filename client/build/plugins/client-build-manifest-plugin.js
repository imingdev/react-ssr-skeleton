/**
 * @intro: 客户端页面构建资源插件.
 */
const { formatFilePath, formatEntryName, formatOutputAssets } = require('../utils');
const { CLIENT_RESOURCE_MANIFEST } = require('../constants');

module.exports = class ClientResourceManifestPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap(this.constructor.name, this.hookCallback);
  }

  hookCallback(compilation) {
    const pages = {};
    const { publicPath } = compilation.options.output;

    for (const entryPoint of compilation.entrypoints.values()) {
      const files = entryPoint.getFiles()
        .map((file) => `${publicPath}${formatFilePath(file)}`);
      const js = files.filter((row) => /\.js$/.test(row));
      const css = files.filter((row) => /\.css$/.test(row));

      pages[formatEntryName(entryPoint.name)] = {
        js,
        css
      };
    }

    compilation.assets[`../config/${CLIENT_RESOURCE_MANIFEST}`] = formatOutputAssets(pages);
  }
};
