# 组件库源码位置在src/package下
# v3版本
```
项目非v3版本，组件不会进行安装注册，仅会挂载utils文件
```
## 文档
```
本地文档 
git clone from https://github.com/TianJiaqing/probably-ui.git
npm install
npm run dev
```
## 使用
```javascript
import {
    createApp
} from 'vue'
import probablyUi,{
    message
} from "probably-ui"
//css需要单独引入
import "probably-ui/style.css";
import App from './App.vue'
const app = createApp(App)
// 默认的 options👇
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
    //自定义事件，在组件使用或注册时会触发该回调函数（未实装，可忽略）
	// custom_callback: (e) => { }
    //修改原型对象（暂未实现，可忽略）
	// need_prototype_change: true,
}
app.use(probablyUi,options).mount('#app')
// 上面👆等价于下面的代码👇（在不修改上诉的默认options的情况下）
// app.use(probablyUi).mount('#app')
// 此时全局window会挂载_t属性

```
### 代码演示
``` Html
<template>
  <div>
    <!-- TButton === T-button 两种使用方式都可以 -->
    <TButton @click="message({ title: '服务器歇菜了；', type: 'fail' })">别点了</TButton>
    <T-button @click="checkType">checkType</T-button>
    <T-button @click="getUrlParam">getUrlParam</T-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'probably-ui'
const num = ref('')
const checkType = () => {
  let list = [1, 2]
  // 1、不用特意区分类型大小写，无论你写的是array或Array，都可以校验
  // 2、类型校验采用的Object.prototype.toString.call，安全且准确
  const _t = window._t
  console.log(_t.checkType(list, 'array'));//true
  console.log(_t.checkType(list, 'array'));//true
  console.log(_t.checkType(list, 'Array'));//true
  console.log(_t.checkType(list, 'string'));//false


  let str = "tjq"
  console.log(_t.checkType(str, 'string'));//true
  console.log(_t.checkType(str, 'String'));//true
  console.log(_t.checkType(str, 'array'));//false



}


const getUrlParam = () =>{

    // 根据参数的不同，返回不同的结果
    //1、如果仅有首个参数url，直接返回处理后的结果 {}(Object)
    //2、如果有第二个参数（且为字符串），返回的是第二个参数对应的结果  ''(String)
    //3、如果有第二个参数（且为数组），返回的是第二个参数对应的结果的数组 [](Array)

  const url ="http://www.baidu.com?name=tjq&age=18"
  {
    const res = _t.getUrlParam(url)
    console.log(res) // {name: "tjq", age: "18"}
  }
  {
    const res = _t.getUrlParam(url,'name')
    console.log(res) // tjq
  }
  {
    const res = _t.getUrlParam(url,'name','age')
    console.log(res) // {name: "tjq", age: "18"}
  }
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
useStorage  | 更方便的使用本地数据（localStorage） | ↑
-|get|----
getUrlParam  | 处理url地址| ↑
getObjectStyle | Object转为css | ↑
getSize | 获取任意变量的长度（数字，null，undefined 返回0） | ↑
-|other|----
recode  | 对象解构赋值之后，把解构出来的内容克隆到一个新的object或array中 | ↑
math | 用于js计算，解决精度问题（不包含÷）| ↑
checkNumber | 用于检查输入框最终的内容是否为存数字 | ↑
checkType | 用于检查任意变量类型 | ↑

## 组件
组件名称 | 内容
-------- | ---
T-button | 按钮组件
T-button-group | 按钮群组件
T-checkbox | 复选框
T-dialog  | 弹窗组件
T-message  | 通知组件
T-ellipsis | 文本组件
T-input   | 输入框
T-switch | 开关组件
T-waterfallFlow | 瀑布流布局组件
T-bgCard | 背景容器组件
T-tabs | 标签页组件


