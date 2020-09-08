const path = require('path');
const express = require('express');
const React = require("react");
const {renderToString} = require('react-dom/server');
const generatePages = require('./generatePages');

const resolve = (dir) => path.join(__dirname, '..', dir);
const app = express();

app.use('/static', express.static(resolve('dist/static')));

const render = ({Document, App, Component, pageProps, js, css}) => {
  const content = renderToString(
    React.createElement(Document, {js, css, state: pageProps},
      React.createElement(App, {Component, pageProps})
    )
  );
  return `<!DOCTYPE html>${content}`;
};

generatePages(app, ({Component, pageProps, js, css, res, App, Document}) => {
  res.send(render({Document, App, Component, pageProps, js, css}))
});

app.listen(8088, () => {
  console.log('监听8088端口');
});
