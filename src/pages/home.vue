<template>
    <div>
      <T-button @click="checkType">checkType</T-button>
      <T-button _type="warning" @click="init" :_loading="_loading" _disabled>button</T-button>
      <!-- <T-button _type="warning" @click="init" :_loading="_loading">button</T-button> -->
      <T-button _type="default" @click="init">button</T-button>
      <T-button @click="init" :_loading="_loading">button</T-button>
      <T-button _type="error" @click="init" :_loading="_loading">button</T-button>
      <T-buttonGroup :_data="['1', '2', '3']" _key="1" @click="fn"></T-buttonGroup>
  
      <h1>flg===>{{ time }}</h1>
      <h1>flg===>{{ flg }}</h1>
      <div style="width: 30%;">
        <T-waterfallFlow :_list="[1, 2, 3, 4, 5, 6, 7, 8, 9, 7, 1, 1, 2, 3, 4, 5,]">
          <template #default="{ info }">
            <p :style="`height:calc( ${info['index'] + 1}*20px);border:1px solid;padding:0;margin:0;'`">{{ info }}</p>
          </template>
        </T-waterfallFlow>
      </div>
      <T-checkbox v-model="flg"></T-checkbox>
      <T-skeleton></T-skeleton>
      <T-text :_line="2">
        <p>{{ data.article }}</p>
      </T-text>
      <T-text>form={{ form }}</T-text>
      <T-input v-model="form.txt" _title="好名字"></T-input>
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
      <br />
      <hr>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  const router = useRouter()
  const checkType = () => {
    // navigator.geolocation.watchPosition((res) => {
    //     console.log('res--->', res);
    //   })
    let b = 'null'
    let c = 'c'
    let a = null
    a ??= c
    let obj = { name: 'tjq', age: 18, sex: '男' }
    const { name, age, ...info } = obj
    console.log('a--->', a);
    console.log('info-->', info);
    let list = [1, 2]
    console.log(window._t.checkType(list, 'array'));//true
    console.log(window._t.checkType(list, 'Array'));//true
    console.log(window._t.checkType(list, 'string'));//false
  }
  
  
  const slotProps = ref({
    text: "---------",
    count: 999,
  });
  
  const form = ref({
    txt: ''
  })
  const init = () => {
    console.log("--------------");
  
    // _DiaLog({ _title: "123", _text: "没意思" }).then((res) => {
    //   console.log("res--->>", res);
    // });
    _DiaLog({ _title: "提示", _text: "是否执行当前的删除操作？" }).then((res) => {
      console.log("res--->>", res);
      __message({ '_title': '删除成功' })
    });
  };
  const list_select = (e) => {
    console.log("e", e);
  };
  
  console.log("__init---<<>>>>", window.__init);
  
  import data from "../package/data/index";
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
  