const {SERVER_PAGES_MANIFEST, CLIENT_BUILD_MANIFEST, SERVER_BUILD_OUTPUT, BLOCKED_PAGES} = require('../build/constants');
const serverDistDir = file => require(`${SERVER_BUILD_OUTPUT}/${file}`);
const ServerPagesManifest = serverDistDir(SERVER_PAGES_MANIFEST);
const ClientBuildManifest = serverDistDir(CLIENT_BUILD_MANIFEST);
const {default: AppPageEntry} = serverDistDir(ServerPagesManifest['/_app']);
const {default: DocumentPageEntry} = serverDistDir(ServerPagesManifest['/_document']);

module.exports = (app, callback) => {
  Object.keys(ServerPagesManifest).forEach(name => {
    if (BLOCKED_PAGES.includes(name)) return false;
    const {default: Component, getServerSideProps} = serverDistDir(ServerPagesManifest[name]);
    const {js = [], css = []} = ClientBuildManifest[name];

    app.get(name, async (req, res) => {
      let state = {};
      const isFunction = Object.prototype.toString.call(getServerSideProps) === '[object Function]';
      if (isFunction) state = await getServerSideProps({req, res});

      callback({Component, pageProps: state, js, css, req, res, App: AppPageEntry, Document: DocumentPageEntry})
    })
  })
};
