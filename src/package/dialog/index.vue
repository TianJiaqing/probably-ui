<template>
  <div class="dialog" ref="dialog" :class="{ background: props._background }">
    <div>
      <div class="line" v-if="props._line"></div>
      <h2 v-if="props._title">{{ props._title }}</h2>
      <div v-if="!props._text">
        <slot></slot>
      </div>
      <p v-else class="text">{{ props._text }}</p>
      <div class="btn">
        <TButton @click="emitFn(false)" _type="default">取消</TButton>
        <TButton @click="emitFn(true)">确认</TButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import TButton from "../button/index.vue";
import data from "../data/index";
const props = defineProps({
  _title: {
    type: String,
    default: data.dialog_title,
  },
  _background: {
    type: Boolean,
    default: true,
  },
  _line: {
    type: Boolean,
    default: true,
  },
  _text: {
    type: String,
    default: "",
  },
});
const dialog = ref(null);
const emit = defineEmits(["_click"]);
const emitFn = (boolean) => {
  emit("_click", boolean);
};
onMounted(() => {
  const z = data.z();
  dialog.value.style = `--t-z-index:${z}`;
});
</script>

<style scoped lang="scss">
.dialog {
  background-color: transparent;
  z-index: 999;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  >div {
    position: relative;
    // min-width: 400px;
    width: 400px;

    min-height: 120px;
    background-color: var(--t-theme-bg);
    border: 2px solid rgba(0, 0, 0, 0.5);
    box-shadow: 0px 3px 5px rgba(0, 21, 41, 0.08);
    border-radius: 8px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: size_show 0.2s ease-in forwards;

    .text {
      // 中文与英文直接产生的空白问题
      word-break: break-all;
      text-indent: 2em;
    }
  }

  &.background {
    background-color: rgba(0, 0, 0, 0.5);

    >div {
      border-radius: 0 0 8px 8px;
    }
  }

  .line {
    --x: 4px;
    width: 100%;
    height: var(--x);
    margin: 0 auto;
    background-color: var(--t-theme-color);
    border-radius: 8px 8px 0 0;
    position: absolute;
    top: calc(var(--x) * -1);
    left: 50%;
    transform: translateX(-50%);
  }

  h2 {
    font-size: 18px;
    font-weight: 500;
    padding: 0;
    margin: 0;
  }

  .btn {
    display: flex;
    justify-content: end;
  }
}
</style>