# uni-app 基础函数封装

## 安装

```bash
npm install @hishion_wei/uniapp-utils -S
# or
yarn add @hishion_wei/uniapp-utils
```

## 使用

具体使用方法参考下方说明

导入并注册，`utils` 会以 `\$h` 作为标识符

```js
// main.js
import Vue from 'vue'

import utils from '@hishion_wei/uniapp-utils'
Vue.use(utils)
```

## route

- 页面跳转

传参可以是 string 的路径，或者路径对象，如 `{url: 'xxx'}`

```js
// $h.navigate() 对应uni.navigateTo()
this.$h.navigate('/pages/order/index')
// or
this.$h.navigate({
  url: '/pages/order/index'
})
// 还有$h.switch, $h.redirect, $h.reLaunch
```

- 页面返回

传参是返回层级，默认是 1

```js
this.$h.goBack()
// 返回前两页
this.$h.goBack(2)
```

## UI

- msg

封装 `uni.showToast()`

```js
// 基本方法
this.$h.msg('hello')

// 配置使用,icon: 'success', 'none'
this.$h.msg('hello', {icon?, duration?, mask?})
```

- copy

封装 `uni.setClipboardData()`，格式： `this.$h.copy(data, tip = '复制成功')`

- makePhoneCall

封装 `uni.makePhoneCall()`，格式：`this.$h.makePhoneCall(number)`

## loading

- loading 提示框

```js
// 开启loading，默认文案是 '数据加载中'，可传参覆盖
this.$h.loading.show(title?)
// 关闭loading
this.$h.loading.hide()
```

- 导航条加载动画

```js
// 开启loading
this.$h.barLoading.show()
// 关闭loading
this.$h.barLoading.hide()
```

## getPage

获取页面实例，一般用于操作某方法等。传参是相对当前页面之前的层级，默认是 0，为当前页面

小程序需要获取`this.$h.getPage().$vm`。

```js
// default 当前页面
this.$h.getPage()

// 前一页面
this.$h.getPage(1)
```

## ck

用于判断回调参数合法性, `this.$h.ck(res: any, showMsg = true)`

| 属性    | 类型               | 说明                                     |
| ------- | ------------------ | ---------------------------------------- |
| res     |                    | 一般为接口回调数据                       |
| showMsg | boolean, 默认 true | 自动提示错误信息                         |
| config  | object             | 用于配置回调数据的 key，兼容不同接口字段 |

因为`config`的不同，可以基于该接口项目进行二次封装，或者复制源码写在业务逻辑里，避免重复性代码

| 属性        | 类型                     | 说明                                                                                        |
| ----------- | ------------------------ | ------------------------------------------------------------------------------------------- |
| codeKey     | string，默认 return_code | 配置接口回调的 status code 字段 name                                                        |
| msgKey      | string，默认 return_msg  | 配置接口回调的 msg 字段 name                                                                |
| successCode | string\|number，默认'0'  | 配置接口回调成功时的 status code                                                            |
| excludeCode | array，默认['80003']     | 一般调接口时遇到登录失效不用提示，这里配置不弹提示的 status code，在 showMsg 为 true 时有效 |

```js
// 默认提示
this.$h.ck(res)
// 不提示
this.$h.ck(res, false)
// 配置config
this.$h.ck(res, true, {
  codeKey: 'Return_Code',
  msgKey: 'Return_Msg',
  successCode: 0,
  excludeCode: [80003]
})
```
源码参考 [uniapp-utils](https://github.com/weixisheng/uniapp-utils/blob/master/src/index.js)

## storage

缓存管理对象，设置、获取和清除缓存

```js
// 设置缓存
this.$h.storage.set('key', 'value')
this.$h.storage.set('key1', 'value1')
// 获取缓存
this.$h.storage.get('key')
// 移除缓存，可以传单个key或者key数组
this.$h.storage.remove('key')
this.$h.storage.remove(['key', 'key1'])
// 清除缓存
this.$h.storage.clear()
```

## 节流

规定时间内，只触发一次
`throttle(fun, wait = 500, immediate = true)`

## 防抖

操作一段时间后才触发
`debounce(fun, wait = 500, immediate = false)`

```vue
<template>
  <view>
    <!-- 此处用法为在模板中使用，直接$h.throttle()即可 -->
    <view class="throttle" @tap="$h.throttle(btnClick1, 500)">
      节流-模板
    </view>
    <view class="throttle" @tap="btnClick2">
      节流-js
    </view>

    <view class="debounce" @tap="$h.debounce(btnClick1, 500)">
      防抖-模板
    </view>
    <view class="debounce" @tap="btnClick4">
      防抖-js
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    btnClick1() {
      console.log('btnClick')
    },
    btnClick2() {
      // 此处用法为在js中调用，需要写this.$h.throttle()
      this.$h.throttle(this.btnClick3, 500)
    },
    btnClick3() {
      console.log('callback')
    },
    btnClick4() {
      // 此处用法为在js中调用，需要写this.$h.debounce()
      this.$h.debounce(this.btnClick3, 500)
    }
  }
}
</script>
```

## 检查更新

内置小程序检测更新，建议在 `onLaunch` 里面调用
```js
this.$h.checkUpdate()
```