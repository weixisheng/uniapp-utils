/* 路由相关 */
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

export default {
  navigate,
  switch: switchTab,
  redirect,
  reLaunch,
  goBack
}
