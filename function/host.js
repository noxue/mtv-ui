export function getBrowserInfo() {
  const ua = window.navigator.userAgent.toLocaleLowerCase()
  let browserType = null
  if (ua.match(/msie/) !== null || ua.match(/trident/) !== null) {
    browserType = 'IE'
  } else if (ua.match(/firefox/) !== null) {
    browserType = '火狐'
  } else if (ua.match(/ubrowser/) !== null) {
    browserType = 'UC'
  } else if (ua.match(/opera/) !== null) {
    browserType = '欧朋'
  } else if (ua.match(/bidubrowser/) !== null) {
    browserType = '百度'
  } else if (ua.match(/metasr/) !== null) {
    browserType = '搜狗'
  } else if (ua.match(/tencenttraveler/) !== null || ua.match(/qqbrowse/) !== null) {
    browserType = 'QQ'
  } else if (ua.match(/maxthon/) !== null) {
    browserType = '遨游'
  } else if (ua.match(/chrome/) !== null) {
    if (window.navigator.userActivation) {
      browserType = '谷歌'
    } else {
      browserType = '360'
      const is360js = _mime('type', 'application/vnd.chromium.remoting-viewer')

      function _mime(option, value) {
        const mimeTypes = navigator.mimeTypes
        for (const mt in mimeTypes) {
          if (mimeTypes[mt][option] === value) {
            return true
          }
        }
        return false
      }

      if (is360js) {
        browserType = '360兼容模式'
      } else {
        browserType = '360急速模式'
      }
    }
  } else if (ua.match(/safari/) !== null) {
    browserType = 'Safari'
  }
  return browserType
}

/**
 * 判断版本
 * @desc 并发1.1.0  2.0.0 这样的格式
 * @param v1 版本1
 * @param v2 版本2
 * @return {number} 1 v1大  0 相等 -1 v2大
 */
export function compareVersion(v1, v2) {
  // 执分数组
  v1 = v1.split('.')
  v2 = v2.split('.')

  // 将位数少的版本进行补齐
  const len = Math.max(v1.length, v2.length)
  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  // 接位比较
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}
