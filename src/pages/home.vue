<template>
  <div class="pages_home">
    <p class="title">WELCOME</p>
    <p class="need">带给你无限可能的</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>

<style lang='scss' scoped>
.pages_home {
  p {
    padding: 0;
    margin: 0;
  }

  .title {
    margin-top: 1em;
    font-weight: 900;
    font-size: 100px;
    font-family: serif;
    text-align: center;
  }

  .need {
    text-align: right;
    padding: 4em;
    font-family: 'Courier New', Courier, monospace;
    color: #666;
  }
}
</style>