const React = require('react');
const { renderToString } = require('react-dom/server');
const express = require('express');
const {
  staticDir, Document, App, pages
} = require('./config');

const render = ({
  Component, store, js, css
}) => {
  const content = renderToString(
    React.createElement(Document, { store, js, css },
      React.createElement(App, { Component, pageProps: store }))
  );
  return `<!DOCTYPE html>${content}`;
};

const app = express();

app.use('/static', express.static(staticDir));

pages.forEach((row) => {
  const {
    url, Component, getServerSideProps, js, css
  } = row;

  app.get(url, async (req, res) => {
    let store;
    const isFunction = Object.prototype.toString.call(getServerSideProps) === '[object Function]';
    if (isFunction) store = await getServerSideProps({ req, res });

    res.send(render({
      Document, App, Component, store, js, css
    }));
  });
});

app.listen(8088, () => {
  console.log('监听8088端口');
});
