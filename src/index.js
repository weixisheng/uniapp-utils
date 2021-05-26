/*
 * @Author: hishion
 * @Date: 2020-11-30 18:35:51
 * @Description 工具集
 */
import throttle from './throttle.js'
import debounce from './debounce.js'

const route = (type) => (url) =>
  typeof url === 'string' ? uni[type]({ url }) : uni[type](url)
export const navigate = (url) => {
  route('navigateTo')(url)
}
export const switchTab = (url) => {
  route('switchTab')(url)
}
export const redirect = (url) => {
  route('redirectTo')(url)
}
export const reLaunch = (url) => {
  route('reLaunch')(url)
}

export const goBack = (delta = 1) => {
  uni.navigateBack({
    delta
  })
}

export const msg = (
  title,
  { icon = 'none', duration = 2000, mask = true } = {}
) => {
  // 使用：this.$msg('提示信息')
  title &&
    uni.showToast({
      title,
      duration,
      mask,
      icon
    })
}

export const loading = {
  show(title = '数据加载中') {
    uni.showLoading({
      title,
      mask: true
    })
  },
  hide() {
    uni.hideLoading()
  }
}

export const barLoading = {
  show() {
    uni.showNavigationBarLoading()
  },
  hide() {
    uni.hideNavigationBarLoading()
  }
}
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
    // if (!excludeCode.includes(res[codeKey])) {
    //   showMsg && msg(res.return_msg)
    // }
    if (!showMsg) return false
    if (!excludeCode.includes(res[codeKey])) {
      msg(res.return_msg)
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
  clear(key) {
    // 单个key直接清除，key数组逐个清除
    if (typeof key === 'string') {
      uni.removeStorageSync(key)
    } else if (Object.prototype.toString.call(key).slice(8, -1) === 'Array') {
      key.length > 0 &&
        key.forEach((item) => {
          uni.removeStorageSync(item)
        })
    }
  }
}

const h = {
  navigate,
  switch: switchTab,
  redirect,
  reLaunch,
  goBack,
  msg,
  loading,
  barLoading,
  getPage,
  ck,
  storage,
  throttle,
  debounce
}
const install = (Vue) => {
  Vue.prototype.$h = h
}
export default {
  install
}
