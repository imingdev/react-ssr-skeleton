/**
 * @intro: 一些常量配置.
 */
const path = require('path');

const resolve = (dir) => path.join(__dirname, '..', dir);
// server目录
exports.SERVER_DIRECTORY = 'server';
// 客户端目录
exports.CLIENT_DIRECTORY = 'client';
// 客户端打包输出目录
exports.CLIENT_BUILD_OUTPUT = resolve('dist');
// 服务端打包输出目录
exports.SERVER_BUILD_OUTPUT = resolve(`dist/${exports.SERVER_DIRECTORY}`);
// server执行文件
exports.SERVER_MAIN_DIRECTORY = `${exports.SERVER_DIRECTORY}/main`;
// client执行文件
exports.CLIENT_MAIN_DIRECTORY = `${exports.CLIENT_DIRECTORY}/main`;
// 页面目录
exports.PAGES_DIRECTORY = 'pages';
// 页面清单
exports.SERVER_PAGES_MANIFEST = 'server-pages-manifest.json';
// 构建的资源清单
exports.CLIENT_BUILD_MANIFEST = 'client-build-manifest.json';
// glob匹配参数
exports.GLOB_PAGES_PATTERN = `${exports.CLIENT_DIRECTORY}/${exports.PAGES_DIRECTORY}/**/index.{js,jsx}`;
// 两个默认页面
exports.BLOCKED_PAGES = ['/_document', '/_app'];
// 客户端静态文件路径
exports.CLIENT_STATIC_FILES_PATH = 'static';
// 图片
exports.FILE_IMAGE_RULES = ['png', 'jpe?g', 'gif', 'svg'];
// 媒体
exports.FILE_MEDIA_RULES = ['mp4', 'webm', 'ogg', 'mp3', 'wav', 'flac', 'aac'];
// 字体
exports.FILE_FONT_RULES = ['woff2?', 'eot', 'ttf', 'otf'];
