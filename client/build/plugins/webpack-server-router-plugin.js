const WebpackManifestPlugin = require('webpack-manifest-plugin');
const beautifyJs = require('js-beautify').js;

module.exports = class WebpackServerRouterPlugin extends WebpackManifestPlugin {
  constructor(opt = {}) {
    super(Object.assign(opt, {
      fileName: opt.fileName,
      serialize: manifest => beautifyJs(manifest, { indent_size: 2 }),
      generate: (seed, files, entryPoints) => {
        const publicPath = opt.publicPath;

        const routerCode = Object.keys(entryPoints)
          .map(name => {
            const entryName = name.replace(/^pages\//, '');
            const url = entryName === 'index' ? '/' : `/${entryName.replace(/_/g, ':')}`;
            const entryFiles = entryPoints[name].map(file => `${publicPath}${file}`);
            const js = entryFiles.filter(row => /\.js$/.test(row));
            const css = entryFiles.filter(row => /\.css$/.test(row));

            return {
              url,
              name: entryName,
              js,
              css
            };
          })
          .map(router => {
            const { url, name, js, css } = router;

            return `Router.get('${url}', async (req, res)=>{
              await res.render('${name}', {js: ${JSON.stringify(js)}, css: ${JSON.stringify(css)}, req, res});
            });`;
          })
          .join('\n');

        return `
          const express = require('express');
          const Router = express.Router();

          ${routerCode}

          module.exports = Router;
        `;
      }
    }));
  }
};
