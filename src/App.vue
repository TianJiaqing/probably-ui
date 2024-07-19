<template>
  <div class="app">
    <T-button _type="warning" @click="init" :_loading="_loading" _disabled>button</T-button>
    <!-- <T-button _type="warning" @click="init" :_loading="_loading">button</T-button> -->
    <T-button _type="default" @click="init" :_loading="_loading">button</T-button>
    <T-button @click="init" :_loading="_loading">button</T-button>
    <T-button _type="error" @click="init" :_loading="_loading">button</T-button>
    <T-buttonGroup :_data="['1', '2', '3']" _key="1" @click="fn"></T-buttonGroup>
    <h1>flg===>{{ time }}</h1>
    <h1>flg===>{{ flg }}</h1>
    <T-checkbox v-model="flg"></T-checkbox>
    <T-text :_line="2">
      <p>{{ data.article }}</p>
    </T-text>
  </div>
</template>

<script setup>
const init = () => {
  console.log('--------------');
}

console.log('__init---<<>>>>', window.__init);

import data from './package/data/index'
import { ref } from 'vue'

const _loading = ref(false)

setInterval(() => {
  _loading.value = !_loading.value
}, 5000);

const time = ref(1)

setInterval(() => {
  time.value++
}, 1000);

const fn = (e) => {
  console.log('e', e);
}

const flg = ref(false)
</script>

<style scoped lang="scss">
.app {
  height: 1200px;
}
</style>
