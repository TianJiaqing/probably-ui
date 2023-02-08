<template>
  <div class="app">
    <!-- <dialogCom></dialogCom> -->
    <btn @click="fn">起飞</btn>
    <btn @click="fn" _type="default">起飞</btn>
    <btn @click="fn" _type="warning">起飞</btn>
    <btn @click="fn" _type="success">起飞</btn>
    <btn @click="fn" _type="error">起飞</btn>
    <btngroup :_data='arr' _key="name" @click="fn"></btngroup>
    <inputdiv _type="textarea" v-model="num"></inputdiv>
    <inputdiv _type="text" v-model="num" :_disabled="true"></inputdiv>
    <inputdiv _type="text" v-model="num" ref="input" _title="账号"></inputdiv>
    <btngroup :_data='arr2' @click="fn"></btngroup>
    <messageCom>服务器错误</messageCom>
    <backTop></backTop>

    <button @click="message({ _title: '服务器傻逼；', _type: 'fail' })">生产message</button>
    <elipsis :_line="1" :_width="'400px'">噜啦噜啦嘞绿绿噜啦噜啦嘞绿绿绿绿绿绿绿绿绿噜啦噜啦嘞绿绿绿绿绿绿绿绿绿噜啦噜啦嘞绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿</elipsis>
    <switchcom v-model="flg" />
    <switchcom v-model="flg" _background="red" _color="yellow" />

    <h1>flg={{ flg }}</h1>
    <loading _type="round"></loading>
    <loading _type=""></loading>
    <loading _type="particle"></loading>
    <btn @click="DiaLog({ _title: '我不想起标题', _content: '我是内容' })">起飞</btn>
    <btn @click="flgDia = !flgDia">起飞</btn>
    <dialogCom _title='我不想起标题' v-if="flgDia" @_click="_click">
      <div>
        <p>田家庆</p>
        <p>来来来</p>
      </div>
    </dialogCom>
    <linkCom></linkCom>
    <checkbox :_half="true" @_click="checkboxFn"></checkbox>
  </div>
</template>

<script setup>
import btn from './package/button/index.vue'
import btngroup from './package/buttonGroup/index.vue'
import inputdiv from './package/input/index.vue'
import messageCom from './package/message/message.vue'
import backTop from './package/backTop/index.vue'
import elipsis from './package/ellipsis/index.vue'
import switchcom from './package/switch/index.vue'
import { message } from './package/message/index.js'
import loading from './package/loading/index.vue'
import dialogCom from './package/dialog/index.vue'
import checkbox from './package/checkbox/index.vue'

import { DiaLog } from './package/dialog/index.js'
import { ref } from "vue";
const flg = ref(true)
const flgDia = ref(false)
const _click = (a) => {
  console.log(a);
  flgDia.value = false
}
const fn = (a, b) => {
  console.log('fn');
  if (a === '获取') {
    input.value._focus()
  }
  if (a === '失去') {
    input.value._blur()
  } if (a === '选中') {
    input.value._select()
  }
  if (a === 'cz') {
    input.value._reset()

  }
  if (a === 'clear') {
    input.value._clear()

  }
  console.log(a, b);
}
const input = ref(null)
// const arr = [1, 2, 3, 4, 5, 6]
const arr = [
  {
    name: 'tjq'
  },
  {
    name: 'xiaoli'
  }, {
    name: 'tjq'
  }, {
    name: 'tjq'
  },
]
const arr2 = [
  '失去',
  '获取',
  '选中',
  'cz',
  'clear'
]
const num = ref('tjq')
const checkboxFn = (e) => {
  console.log(e);
}
</script>

<style scoped lang="scss">
.app {
  height: 1200px;
}
</style>

<!-- <template>
  <div class="">
    <TInput></TInput>
    <TButton @click="message({ _title: '服务器傻逼；', _type: 'fail' })">点nmd</TButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'probably-ui'
const num = ref('')
</script>

<style scoped lang="scss">

</style> -->