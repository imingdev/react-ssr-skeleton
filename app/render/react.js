/**
 * @intro: 用于react渲染.
 */
const React = require('react');
const ReactDOMServer = require('react-dom/server');

module.exports = class ReactRender {
  constructor(ctx) {
    const { requireReactElement } = this;
    const { app } = ctx;
    const config = app.config.react;
    this.ctx = ctx;
    this.config = config;
    this.doctype = config.doctype;
    this.manifest = requireReactElement(config.manifest);
    this.Document = requireReactElement(config.document);
    this.App = requireReactElement(config.app);
  }

  requireReactElement(filepath) {
    const reactElement = require(filepath);
    return reactElement && reactElement.default ? reactElement.default : reactElement;
  }

  normalizeLocals(locals = {}) {
    ['ctx', 'request', 'helper'].forEach((key) => {
      Object.defineProperty(locals, key, { enumerable: false });
    });
    return locals;
  }

  render(name, locals) {
    const {
      manifest, doctype, Document, App, ctx, requireReactElement, normalizeLocals
    } = this;
    const { url } = ctx.request;
    const { js, css } = manifest[url];
    const Component = requireReactElement(name);
    const store = normalizeLocals(locals);

    const content = ReactDOMServer.renderToString(React.createElement(Document, { store, js, css },
      React.createElement(App, { Component, pageProps: store })));

    return `${doctype}${content}`;
  }

  renderString(tpl, locals) {
    return Promise.reject('not implemented yet!');
  }
};
