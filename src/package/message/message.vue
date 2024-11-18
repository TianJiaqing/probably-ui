<template>
  <div class="t-message animation" ref="message" :style="props.style">
    <div class="animate-top">
      <span v-if="props.title"
        ><span class="iconfont" :class="classtype"></span
        >{{ props.title }}</span
      >
      <slot v-else></slot>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from "vue";
const props = defineProps({
  type: {
    default: "success",
    type: String,
  },
  style: {
    default: () => ({}),
    type: Object,
  },
  title: {
    default: "",
    type: String,
  },
  //不推荐时长小于1000
  duration: {
    default: 1000,
    type: [Number, String],
  },
});
const _defaut = props.modelValue;
const emit = defineEmits(["_message", "update:modelValue"]);
const _emit = (e) => {};
const message = ref(null);
onMounted(() => {
  emit("_message", true);
  init();
});

const class_obj = {
  success: {
    class: "icon-chenggong",
    bg: "rgba(0, 128, 0, .1)",
  },
  warning: {
    class: "icon-jinggao",
    bg: "rgba(240,160,32,.1)",
  },
  fail: {
    class: "icon-shibai1",
    bg: "rgba(255,0,0,.1)",
  },
};
const classtype = ref(null);

const init = () => {
  const _promise = new Promise((succ, fail) => {
    setTimeout(() => {
      message.value.classList.remove("animation");
      message.value.classList.add("remove");
      succ(null);
    }, props.duration);
  });

  //   移除元素
  _promise.then((res) => {
    setTimeout(() => {
      message.value.remove();
      emit("_message", false);
    }, 1000);
  });
  let info = class_obj[props.type];
  if (info) {
    message.value.style.cssText += `--t-bg:${info["bg"]};`;
    classtype.value = info["class"];
  } else {
    classtype.value = "icon-jinggao";
  }
};
</script>

<style scoped lang="scss">
.t-message {
  position: fixed;
  bottom: 20px;
  left: 50%;

  &.animation {
    animation: animate-top 0.5s ease-in-out forwards;
  }

  > div {
    background-color: var(--t-bg);
    color: #666;
    min-width: 400px;
    padding: 0.6em 2em;
    cursor: pointer;
    border-radius: 5px;
    .iconfont {
      margin: 0px 5px;
    }

    .icon-shibai1 {
      color: red;
    }

    .icon-chenggong {
      color: green;
    }

    .icon-jinggao {
      color: #f0a020;
    }
  }
}

.warning {
}

.remove {
  //   opacity: 0 !important;
  animation: opacity 0.2s ease-in-out forwards;
  top: 1%;
  transform: translateX(-50%) scale(1);
}
</style>