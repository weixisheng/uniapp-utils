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

export function copy(data, tip = '复制成功') {
  uni.setClipboardData({
    data,
    success() {
      msg(tip)
    }
  })
}

export function makePhoneCall(number) {
  uni.makePhoneCall({
    phoneNumber: number
  })
}

export default {
  msg,
  copy,
  makePhoneCall
}
