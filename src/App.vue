<template>
  <div class="app">
    <T-button v-for="(item, index) in routes" :key="index" @click="router.push({path:item.path})">{{ item['meta']['title']
      }}</T-button>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { routes } from './router/index'
import { useRouter } from "vue-router";
const router = useRouter()
</script>

<style scoped lang="scss">
.app {
  height: 1200px;
}
</style>
