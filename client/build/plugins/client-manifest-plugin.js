const WebpackManifestPlugin = require('webpack-manifest-plugin');
const config = require('../config');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';

class ClientManifestPlugin extends WebpackManifestPlugin {
  constructor(options = {}) {
    super({
      ...options,
      writeToFileEmit: true,
      generate: (seed, files, entryPoints) => {
        let publicPath = config.assetsPublicPath;
        if (isDevelopment) {
          publicPath = `http://${config.dev.host}:${config.dev.port}${config.assetsPublicPath}`;
        }
        return Object.assign.apply(Object, Object.keys(entryPoints)
          .map(name => {
            const files = entryPoints[name].map(file => `${publicPath}${file}`);

            const scripts = files.filter(row => /\.js$/.test(row));
            const styles = files.filter(row => /\.css$/.test(row));

            return {
              [name]: {
                scripts,
                styles
              }
            };
          }));
      }
    });
  }

  // apply(compiler) {
  //   compiler.hooks.emit.tap(this.constructor.name, this.hookCallback.bind(this));
  // }

  hookCallback(compilation) {
    const pages = {};
    const outputPublicPath = compilation.options.output.publicPath;
    let publicPath = outputPublicPath;
    if (isDevelopment) {
      publicPath = `http://${config.dev.host}:${config.dev.port}${outputPublicPath}`;
    }
    const entryPoints = compilation.entrypoints.values();
    Object.keys(entryPoints)
      .forEach(name => {
        const files = entryPoints[name].getFiles()
          .map(file => `${publicPath}${file}`);
        const scripts = files.filter(row => /\.js$/.test(row));
        const styles = files.filter(row => /\.css$/.test(row));
        pages[name] = {
          scripts,
          styles
        };
      });

    const out = JSON.stringify(pages, null, 2);
    compilation.assets[this.filename] = {
      source: () => out,
      size: () => out.length
    };
  }
}

module.exports = ClientManifestPlugin;
