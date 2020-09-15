const path = require('path');
const express = require('express');
const consola = require('consola');
const reactEngine = require('./engine/react');
const dynamicRequire = require('./utils/dynamicRequire');

const PORT = process.env.PORT || 8088;

const app = express();
const resolve = (dir) => path.join(__dirname, './', dir);

app.engine('react', reactEngine({
  doctype: '<!doctype html>',
  layout: resolve('pages/_document.react')
}));
app.set('views', resolve('pages'));
app.set('view engine', 'react');

app.use('/', express.static(resolve('public')));
app.use('/static', express.static(resolve('static')));

// 将router下面的文件全部导入
dynamicRequire('router')
  .forEach((file) => app.use(require(file)));

app.listen(PORT);
consola.ready({
  message: `Server listening on http://localhost:${PORT}`,
  badge: true
});
