## 使用
```javascript
import {
    createApp
} from 'vue'
import probablyUi,{
    message,
    DiaLog
} from "probably-ui"
import "probably-ui/style.css";
import App from './App.vue'
const app = createApp(App)
const options = {
	// 是否需要注册工具
	need_utils: true,
	// 全局工具对象命名
	utils_name: '_t',
	//重新定义单独工具的名称
	utils_rename: null,
	// utils_rename: {
	// 	getUrlParam: 'name1'
	// },
	// 是否需要注册组件
	need_component: true,
	//默认弹窗初始的z-index
	z_index: 1,
	// custom_callback: (e) => { }
	need_prototype_change: true,
}
app.use(probablyUi,options).mount('#app')
// 此时全局window会挂载_t属性

```
### 代码演示
``` Html
<template>
  <div class="">
    <!-- TButton === T-button 两种使用方式都可以 -->
    <TButton @click="message({ _title: '服务器歇菜了；', _type: 'fail' })">别点了</TButton>
    <T-button @click="checkType">checkType</T-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'probably-ui'
const num = ref('')
const checkType = () => {
  let list = [1, 2]
  // 1、不用特意区分类型大小写
  // 2、类型校验采用的Object.prototype.toString.call，是安全且准确的
  console.log(window._t.checkType(list, 'array'));//true
  console.log(window._t.checkType(list, 'Array'));//true
  console.log(window._t.checkType(list, 'string'));//false
}
</script>

<style scoped>
</style>
```

除此之外，window._t还提供了下列方法与组件
## 方法
方法名     | 作用 | 参数
-------- | ------ | ---- 
useFetch  | 使用网络请求 | 见具体文件 
recode  | 对象解构复制之后，把解构出来的内容克隆到一个新的object或array中 | ↑
getUrlParam  | 处理url地址| ↑
## 组件
组件名称 | 内容
-------- | ---
T-button | 按钮组件
T-button-group | 按钮群组件
T-checkbox | 复选框
T-dialog  | 弹窗组件
T-ellipsis | 文本组件
T-input   | 输入框
T-switch | 开关组件