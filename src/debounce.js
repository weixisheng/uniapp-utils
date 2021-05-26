let timeout = null
/**
 * 防抖
 * @param {Function} func 回调函数
 * @param {Number} wait 时间间隔 单位ms
 * @param {Boolean} immediate 开始还是结束时触发，一般false即可
 */
function debounce(func, wait = 500, immediate = false) {
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout)
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout
    timeout = setTimeout(function () {
      timeout = null
    }, wait)
    if (callNow) typeof func === 'function' && func()
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func()
    }, wait)
  }
}

export default debounce
