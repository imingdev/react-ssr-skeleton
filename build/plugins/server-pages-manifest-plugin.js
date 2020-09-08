/**
 * @intro: 服务端页面插件.
 */
const {formatFilePath, formatEntryName, formatOutputAssets} = require('../utils')
const {SERVER_PAGES_MANIFEST} = require('../constants')

module.exports = class ServerBuildManifestPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap(this.constructor.name, this.hookCallback);
  }

  hookCallback(compilation) {
    const pages = {}

    for (const entryPoint of compilation.entrypoints.values()) {
      const path = formatFilePath(entryPoint.getFiles().filter(row => /\.js$/.test(row))[0])

      pages[formatEntryName(entryPoint.name)] = path
    }

    compilation.assets[SERVER_PAGES_MANIFEST] = formatOutputAssets(pages)
  }
}
