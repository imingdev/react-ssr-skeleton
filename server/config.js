const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = NODE_ENV === 'production';

const pathJoin = (dir) => path.resolve(__dirname, dir);
const rootDir = isProduction ? pathJoin('./') : pathJoin('../dist/server');
const requireFile = (_path) => require(pathJoin(`${rootDir}/${_path}`));

const documentKey = '/_document';
const appKey = '/_app';

const ServerPagesManifest = requireFile('server-pages-manifest.json');
const ClientBuildManifest = requireFile('client-build-manifest.json');
const { default: Document } = requireFile(ServerPagesManifest[documentKey]);
const { default: App } = requireFile(ServerPagesManifest[appKey]);

module.exports = {
  staticDir: isProduction ? pathJoin('../static') : pathJoin('../dist/static'),
  Document,
  App,
  pages: Object.keys(ServerPagesManifest)
    .filter((name) => ![documentKey, appKey].includes(name))
    .map((name) => {
      const { js, css } = ClientBuildManifest[name];
      const { default: Component, getServerSideProps } = requireFile(ServerPagesManifest[name]);
      return {
        url: name,
        Component,
        getServerSideProps,
        js,
        css
      };
    })
};
