let timer, flag
/**
 * 节流
 * @param {Function} func 回调函数
 * @param {Number} wait 时间间隔 单位ms
 * @param {Boolean} immediate 立即执行，true第一次操作触发回调，false在最后一次触发
 */
function throttle(func, wait = 500, immediate = true) {
  if (immediate) {
    if (!flag) {
      flag = true
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func()
      timer = setTimeout(() => {
        flag = false
      }, wait)
    }
  } else {
    if (!flag) {
      flag = true
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(() => {
        flag = false
        typeof func === 'function' && func()
      }, wait)
    }
  }
}
export default throttle
