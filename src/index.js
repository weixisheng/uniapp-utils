/*
 * @Author: hishion
 * @Date: 2020-11-30 18:35:51
 * @Description 工具集
 */
import throttle from './modules/throttle'
import debounce from './modules/debounce'
import route from './modules/route'
import loading from './modules/loading'
import ui from './modules/ui'
import checkUpdate from './modules/update'
const { name, version } = require('../package.json')
console.log(`%c ${name}: v${version} `, `background-color: #8e0;color:#fff;`)

/**
 * 返回页面实例
 * @param {Number} delta 页面相对层级
 * 注意的是小程序里面一些数据在this.$getPage().$vm.$mp里面，例如链接参数.query
 */
export const getPage = (delta = 0) => {
  const pages = getCurrentPages()
  const page = pages[pages.length - delta - 1]
  return page
}
/**
 *
 * @param {Object} res 接口响应
 * @param {Boolean} showMsg 是否自动提示错误信息
 */
export const ck = (
  res = {},
  showMsg = true,
  {
    codeKey = 'return_code',
    msgKey = 'return_msg',
    successCode = '0',
    excludeCode = ['80003']
  } = {}
) => {
  if (res[codeKey] === successCode) {
    return true
  } else {
    if (!showMsg) return false
    if (!excludeCode.includes(res[codeKey])) {
      msg(res[msgKey])
    }
    return false
  }
}
export const storage = {
  get(key) {
    return uni.getStorageSync(key)
  },
  set(key, value) {
    uni.setStorageSync(key, value)
  },
  remove(key) {
    // 单个key直接清除，key数组逐个清除
    if (typeof key === 'string') {
      uni.removeStorageSync(key)
    } else if (Object.prototype.toString.call(key).slice(8, -1) === 'Array') {
      key.length > 0 &&
        key.forEach((item) => {
          uni.removeStorageSync(item)
        })
    }
  },
  clear() {
    uni.clearStorageSync()
  }
}

const h = {
  ...route,
  ...loading,
  ...ui,
  getPage,
  ck,
  storage,
  throttle,
  debounce,
  checkUpdate
}
const install = (Vue) => {
  Vue.prototype.$h = h
}
export default {
  install
}
