<template>
  <div class="app">
    <T-button _type="warning" @click="init" :_loading="_loading" _disabled
      >button</T-button
    >
    <!-- <T-button _type="warning" @click="init" :_loading="_loading">button</T-button> -->
    <T-button _type="default" @click="init">button</T-button>

    <T-button @click="init" :_loading="_loading">button</T-button>
    <T-button _type="error" @click="init" :_loading="_loading">button</T-button>
    <T-buttonGroup
      :_data="['1', '2', '3']"
      _key="1"
      @click="fn"
    ></T-buttonGroup>
    <h1>flg===>{{ time }}</h1>
    <h1>flg===>{{ flg }}</h1>
    <T-checkbox v-model="flg"></T-checkbox>
    <T-text :_line="2">
      <p>{{ data.article }}</p>
    </T-text>
    <!-- <MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent> -->
    <T-list _number="99999" :_list="data.list" @_select="list_select">
      <!-- <template v-slot="slotProps">
        {{ slotProps.text }} {{ slotProps.count }}
      </template> -->
      <template #default="{ info }">
        <div style="padding: 15px 0">
          {{ info }}
        </div>
        <div v-show="info.flg" style="height: 60px; background: #999">flg</div>
      </template>
    </T-list>
    <div style="height: 400px; overflow: auto">
      <div v-for="(item, index) in data.list" :key="index" style="height: 51px">
        {{ item }}
      </div>
    </div>
    <T-switch></T-switch>
    <T-backTop></T-backTop>
  </div>
</template>

<script setup>
const slotProps = ref({
  text: "---------",
  count: 999,
});
const init = () => {
  console.log("--------------");
  // __message({'_title':'没意思'})
  _DiaLog({ _title: "123", _text: "没意思" }).then((res) => {
    console.log("res--->>", res);
  });
};
const list_select = (e) => {
  console.log("e", e);
};

console.log("__init---<<>>>>", window.__init);

import data from "./package/data/index";
import { ref } from "vue";

const _loading = ref(false);

setInterval(() => {
  _loading.value = !_loading.value;
}, 5000);

const time = ref(1);

setInterval(() => {
  time.value++;
}, 1000);

const fn = (e) => {
  console.log("e", e);
};

const flg = ref(false);
</script>

<style scoped lang="scss">
.app {
  height: 1200px;
}
</style>
