const path = require('path');
const express = require('express');
const reactEngine = require('./engine/react');
const ssrRouter = require('./router/ssr');

const app = express();
const resolve = (dir) => path.join(__dirname, './', dir);

app.engine('react', reactEngine({
  doctype: '<!doctype html>',
  layout: resolve('pages/_document.react')
}));
app.set('views', resolve('pages'));
app.set('view engine', 'react');

app.use(ssrRouter);
app.use('/static', express.static(resolve('static')));

app.listen(8088, () => {
  console.log('监听8088端口');
});
