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

export default {
  loading,
  barLoading
}
