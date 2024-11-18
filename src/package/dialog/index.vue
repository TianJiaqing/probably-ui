<template>
  <div class="dialog" ref="dialog" :class="{ background: props.class }">
    <div>
      <div class="line" :class="{ 'top-line': props.line }"></div>
      <h2 v-if="props.title">{{ props.title }}</h2>
      <div v-if="!props.text">
        <slot name="default"></slot>
      </div>
      <p v-else class="text">{{ props.text }}</p>
      <div class="btn">
        <TButton @click="emitFn(index)" :type="item.type" v-for="(item, index) in props.button" :key="index">{{
          item.title
        }}
        </TButton>
      </div>
    </div>
  </div>
</template>
<script>
// 弹窗组件
export default {
  name: 'TDialog'
}
</script>
<script setup>
import { onMounted, ref } from "vue";
import TButton from "../button/index.vue";
import data from "../data/index";
const props = defineProps({
  //dialog左上方标题
  title: {
    type: String,
    default: data.dialog_title,
  },
  //dialog展示文字
  text: {
    type: String,
    default: "",
  },
  //自定义组件class名称
  class: {
    type: Boolean,
    default: true,
  },
  // 是否需要顶部横线
  line: {
    type: Boolean,
    default: true,
  },
  // 底部按钮操作栏
  button: {
    type: [Array],
    default: () => [{
      //按钮文字
      title: '取消',
      //按钮类型
      type: "default",
      //自定义按钮点击事件
      custom_event: false,
      // 点击按钮后，是否需要保持当前弹窗状态(未实现)
      keep_dialog: false
    }, {
      title: '确定',
      type: "primary",
      custom_event: false,
      keep_dialog: false
    }],
  },

});
const dialog = ref(null);
const emit = defineEmits(["_click"]);
const emitFn = (index) => {
  const info = props.button[index]
  const { keep_dialog, custom_event } = info
  if (custom_event instanceof Function) {
    custom_event()
  } else {
    emit("_click", index);
  }

  if (!keep_dialog) {
    // dialog.value.remove()
  }
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

  .top-line {
    --x: 4px;
    width: 100%;
    height: var(--x);
    margin: 0 auto;
    border-radius: 8px 8px 0 0;
    position: absolute;
    top: calc(var(--x) * -1);
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
  }

  .line {
    background-color: var(--t-theme-color);
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