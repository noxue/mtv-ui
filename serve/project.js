import host from '@/config/hostConfig.js';
/********************
 * 项目方法
 **********************/

/**
 * 获取文件地址
 * @param {Object} url
 */
function setFileHost(url) {
  if (url.indexOf('http') > -1) {
    return url;
  } else {
    if (url[0] == '/') {
      return host.fileHost + url;
    } else {
      return host.fileHost + '/' + url;
    }
  }
}

module.exports = {
  setFileHost
}
