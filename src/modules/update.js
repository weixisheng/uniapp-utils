function checkUpdate() {
  if (uni.canIUse('getUpdateManager')) {
    const updateManager = uni.getUpdateManager()
    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      res.hasUpdate && console.log(`小程序有新版本`)
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function() {
          // 强制小程序重启并使用新版本
          updateManager.applyUpdate()
        })
        updateManager.onUpdateFailed(function() {
          // 新的版本下载失败
          uni.showModal({
            title: '已经有新版本了~',
            content: '新版本已经上线啦~ 请您删除当前小程序，重新搜索打开~'
          })
        })
      }
    })
  } else {
    // 如果希望用户在最新版本的客户端上体验您的小程序
    uni.showModal({
      title: '提示',
      content:
        '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
  }
}

export default checkUpdate