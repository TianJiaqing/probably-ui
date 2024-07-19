<template>
  <div class="button">
    <button @click="_emit" :class="`${props._type} ${props._size} ${_disabled ? 'disabled' : _loading ? '' : 'common'} `"
      :style="_style">
      <div>
        <span class="iconfont icon-jiazai1" v-if="_loading"></span>
        <slot></slot>
      </div>
    </button>
  </div>
</template>
<script>
export default {
  name: "TButton",
};
</script>
<script setup>
import { ref } from "vue";
const props = defineProps({
  _type: {
    default: "primary",
    type: String,
  },
  _size: {
    default: "medium",
    type: String,
  },
  _style: {
    default: "",
    type: String,
  },
  _loading: {
    default: false,
    type: Boolean,
  },
  _disabled: {
    default: false,
    type: Boolean
  },
  _space: {
    default: 'inline-block',
    type: String,
  }
});
const emit = defineEmits(["click"]);
const _emit = () => {
  !props._disabled && !props._loading && emit("click")
};
</script>

<style scoped lang="scss">
button {
  //默认背景颜色
  --t-bg: #fff;
  //默认位置颜色
  --t-cc: #666;
  //默认文字大小
  --t-lh: 14px;
  border: 2px solid transparent;
  border-radius: 5px;
  margin: 10px;
  font-size: var(--t-lh);
  font-weight: 500;
  font-family: inherit;
  background-color: var(--bg);
  cursor: pointer;
  transition: border-color 0.25s;


  >div {
    display: flex;
    align-items: center;
    justify-content: center;

    .iconfont {
      font-size: 12px;
      line-height: var(--t-lh);
      margin-right: 2px;
      animation: round 1s linear infinite;
    }
  }
}

.common:hover {
  border: 2px solid var(--bg);
  background-color: var(--t-bg);
  color: var(--t-cc);
  transition: all 0.2s linear;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, .3);

}

.primary {
  --bg: #18a058;
  color: white;
}

.warning {
  --bg: #f0a020;
  color: white;
}

.default {
  color: black;
  --bg: rgba(0, 0, 0, 0.1);
}

.success {
  --bg: #4098fc;
  color: white;
}

.error {
  --bg: #d03050;
  color: white;
}

.medium {
  padding: 5px 15px;
}

.large {
  padding: 5px 20px;
  font-size: 18px;
}

.small {
  padding: 2px 5px;
  font-size: 12px;
}

.disabled {
  border: 2px solid var(--t-cc);
  background-color: rgba(102, 102, 102, .6);
  cursor: no-drop;
}
</style>