/**
 * 银行卡
 * @param {Object} data
 */
export function isIdCard(data) {
  var reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (!reg.test(data)) {
    return false;
  }

  return true;
}

/**
 * 是否纯中文
 * @param {Object} data
 */
export function isRealName(data) {
  var reg = /[^\u4e00-\u9fa5]/;
  if (reg.test(data)) {
    return false
  };

  return true;
}

/**
 * 昵称 只能包含中文 英文  2到20位
 * @param {Object} data
 */
export function isNickName(data) {
  var reg = /^[\u4e00-\u9fa50-9a-zA-Z_\-]{2,20}$/;
  if (!reg.test(data)) {
    return false;
  }

  return true;
}

/**
 * 是密码
 * @param {Object} password
 */
export function isPassword(password) {
  return /^([\w\d_-]+){6,16}$/.test(password)

  return true;
}

/**
 * 是否是纯数字
 * @判断是否是0到9的纯数字
 * @param t
 * @returns {boolean}
 */
export function isPurenumber(t) {
  return !!/^[0-9]*$/.test(t);
}

/**
 * 是否是手机号
 * @param mobile
 * @returns {boolean}
 */
export function isMobile(mobile) {
  return /^1[3456789]\d{9}$/.test(mobile)
}

/**
 * 是否是email(TODO 未完成)
 * @param mobile
 * @returns {boolean}
 */
export function isEmail(email) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(email);
}

/**
 * 是否是json字符串
 * @desc 判断字符串是否是json形式的
 * @param str
 * @returns {boolean}
 */
export function isJsonString(str) {
  try {
    if (typeof JSON.parse(str) == "object") {
      return true;
    }
  } catch (e) {

  }
  return false;
}

/**
 * 是否为空
 * @param {Object} str
 */
export function isEmpty(str) {
  if (str === '' || str === null || typeof str === 'undefined') {
    return true
  } else {
    return false
  }
}

/**
 * 是否对象
 */
export function isObject(object) {
  return true
}

/**
 * 是否是数组
 */
export function isArray(array) {
  return true
}


/**
 * 是否是空数据
 * @param {*} string 
 */
export function isEmpty(string) {
  if (string === null || string === undefined || (typeof string === 'string' && string.trim() === '')) {
    return true
  } else {
    return false
  }
}

/**
 * 判断类型
 * @param {Object} arg
 * @param {Object} type
 */
export function isType(arg, type) {
  return Object.prototype.toString.call(arg) === '[object ' + type + ']'
}

function classof(o) {
  if (o === null) return 'Null'
  if (o === undefined) return 'Undefined'
  return Object.prototype.toString.call(o).slice(8, -1) // 获取对象类型
}

export function dataType(value) {
  const str = classof(value)
  switch (str) {
    case 'undefined': // undefined类型
      return undefined
    case 'Object': // null类型, 任意内置对象, 数组
      return 'object'
    case 'Boolean': // true, false类型
      return 'boolean'
    case 'String': // string字符串类型
      return 'string'
    case 'Function': // 任意函数
      return 'function'
    case 'Number': // 任意的数值类型,包含NaN
      return 'number'
    case 'Date': // 日期
      return 'date'
    case 'Array': // 数组
      return 'array'
    case 'RegExp': // 正则
      return 'regExp'
    case 'Null': // 正则
      return 'null'
  }
}

export function checkPass(s) {
  if (s.length < 6) {
    return 0
  }
  var ls = 0
  if (s.match(/([a-z])+/)) {
    ls++
  }
  if (s.match(/([0-9])+/)) {
    ls++
  }
  if (s.match(/([A-Z])+/)) {
    ls++
  }
  if (s.match(/[^a-zA-Z0-9]+/)) {
    ls++
  }
  return ls
}
