/**
 * @intro: 一些常量配置.
 */
const path = require('path');

const resolve = (dir) => path.join(__dirname, '..', dir);

// 服务端目录
exports.SERVER_DIRECTORY = resolve('../app');
// 构建的资源清单
exports.CLIENT_RESOURCE_MANIFEST = 'resource-manifest.json';
// glob匹配参数
exports.GLOB_PAGES_PATTERN = 'src/pages/**/index.{js,jsx}';
// 图片
exports.FILE_IMAGE_RULES = ['png', 'jpe?g', 'gif', 'svg'];
// 媒体
exports.FILE_MEDIA_RULES = ['mp4', 'webm', 'ogg', 'mp3', 'wav', 'flac', 'aac'];
// 字体
exports.FILE_FONT_RULES = ['woff2?', 'eot', 'ttf', 'otf'];
