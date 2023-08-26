/**
 * 字符串去空
 * @param {Object} str
 */
export function trim(str) {
  return String.prototype.trim.call(str)
}

/**
 * 补0
 * @param {Object} num
 */
function fillZeroPrefix(num) {
  return num < 10 ? "0" + num : num
}
