const path = require('path');
const express = require('express');
const reactEngine = require('./engine/react');
const dynamicRequire = require('./utils/dynamicRequire');

const app = express();
const resolve = (dir) => path.join(__dirname, './', dir);

app.engine('react', reactEngine({
  doctype: '<!doctype html>',
  layout: resolve('pages/_document.react')
}));
app.set('views', resolve('pages'));
app.set('view engine', 'react');

app.use('/static', express.static(resolve('static')));

// 将router下面的文件全部导入
dynamicRequire('router')
  .forEach((file) => app.use(require(file)));

app.listen(8088, () => {
  console.log('监听8088端口');
});
