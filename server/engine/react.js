const React = require('react');
const ReactDOMServer = require('react-dom/server');

const requireReactElement = (filePath) => {
  const { default: Component, getServerSideProps } = require(filePath);
  return {
    Component,
    getServerSideProps
  };
};

const renderToString = (reactElement, locals) => {
  const element = React.createElement(reactElement, locals);
  return ReactDOMServer.renderToString(element);
};

module.exports = ({ doctype, layout } = {}) => {
  const { Component: Document } = requireReactElement(layout);

  return async (filePath, options, callback) => {
    const {
      js, css, req, res
    } = options;
    const { Component, getServerSideProps } = requireReactElement(filePath);
    let store;
    if (getServerSideProps && typeof getServerSideProps === 'function') {
      store = await getServerSideProps({
        req,
        res
      });
    }

    const content = renderToString(Document, {
      Component,
      store,
      js,
      css
    });

    callback(null, `${doctype}${content}`);
  };
};
