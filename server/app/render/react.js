/**
 * @intro: 用于react渲染.
 */
const htmlMinify = require('html-minifier-terser').minify;
const React = require('react');
const ReactDOMServer = require('react-dom/server');

module.exports = class ReactRender {
  constructor(ctx) {
    this.requireReactElement = this.requireReactElement.bind(this);
    this.formatManifest = this.formatManifest.bind(this);
    this.renderReactToString = this.renderReactToString.bind(this);

    const { app } = ctx;
    const config = app.config.react;
    this.app = app;
    this.ctx = ctx;
    this.config = config;
    this.minify = config.minify || {};
    this.doctype = config.doctype;
    this.manifest = this.formatManifest(config.manifest);
    this.Document = this.requireReactElement(config.document);
    this.App = this.requireReactElement(config.app);
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

  formatManifest(manifestPath) {
    const manifest = this.requireReactElement(manifestPath);

    return Object.assign.apply(Object, Object.keys(manifest)
      .map(name => {
        const _name = name
          .replace(new RegExp('/index$'), '')
          .replace(/^index$/, '');
        return { [`/${_name}`]: manifest[name] };
      }));
  }

  renderReactToString(Component, locals) {
    const { app, ctx, normalizeLocals, minify, manifest, doctype, Document, App } = this;
    const { url } = ctx.request;

    const currentManifest = manifest[url];
    // App, Component, pageScripts, pageStyles, store
    const content = ReactDOMServer.renderToString(React.createElement(Document, {
      App,
      Component,
      pageScripts: currentManifest.scripts || [],
      pageStyles: currentManifest.styles || [],
      store: normalizeLocals(locals)
    }));
    const htmlStr = `${doctype}${content}`;

    if (app.config.env === 'local') return htmlStr;
    return htmlMinify(`${doctype}${content}`, minify);
  }

  render(name, locals) {
    const { requireReactElement, renderReactToString } = this;
    const Component = requireReactElement(name);

    return renderReactToString(Component, locals);
  }

  renderString(tpl, locals) {
    return Promise.reject('not implemented yet!');
  }
};
