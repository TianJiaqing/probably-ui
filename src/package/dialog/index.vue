<template>
  <div class="dialog">
    <h1 v-if="props._title">{{ props._title }}</h1>
    <div>
      <slot></slot>
    </div>
    <div class="btn">
      <TButton @click="emitFn(false)" _type="default">取消</TButton>
      <TButton @click="emitFn(true)">确认</TButton>
    </div>
  </div>
  <div class="background" v-if="props._background"></div>
</template>

<script setup>
import TButton from "../button/index.vue";
const props = defineProps({
  _title: {
    type: String,
    default: "尚未填写标题",
  },
  _background: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["_click"]);
const emitFn = (boolean) => {
  emit("_click", boolean);
};
</script>

<style scoped lang="scss">
.dialog {
  background-color: white;
  z-index: 999;
  position: fixed;
  width: 400px;
  min-height: 120px;
  left: 50%;
  top: 50%;
  border: 1px solid rgba(0, 0, 0, 0.5);
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;

  h1 {
    font-size: 20px;
    font-weight: 400;
    padding: 0;
    margin: 0;
  }

  .btn {
    display: flex;
    justify-content: end;
  }
}

.background {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  // display: none;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
</style>