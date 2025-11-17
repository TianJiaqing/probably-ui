<template>
  <div class="t-tabs hidden-scroll" ref="t_tabs" v-if="list.length">
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="`t-tabs-card ${modelValue == index && active_class}`"
      @click="change_tabs(index)"
    >
      <slot name="default" :item="item" :index="index">
        <div>{{ item.name }}</div>
      </slot>
    </div>
    <!-- 自适应宽度卡片，最后一个flex布局元素 -->
    <div
      class="t-tabs-card"
      style="flex-grow: 1; flex-shrink: 1"
      v-if="options.size == 'auto'"
    ></div>
    <!-- 高亮线 -->
    <template v-if="props.show_line">
      <div :class="`t-tabs-line ${line_class}`" ref="t_tabs_line"></div>
    </template>
  </div>
</template>
<script>
// tabs组件
export default {
  name: "TTabs",
};
</script>
<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: -1,
  },
  //自定义焦点类名
  active_class: {
    type: String,
    default: "t-tabs-active",
  },
  //自定义线的类名
  line_class: {
    type: String,
    default: null,
  },
  //配置项
  options: {
    type: Object,
    default: () => ({
      size: "auto", //max || auto  最大宽度 || 自适应宽度
    }),
  },
  //自定义列表
  list: {
    type: Array,
    default: () => [],
  },
  //是否开启滚动
  scroll: {
    type: Boolean,
    default: true,
  },
  //默认滚动间距
  scroll_space: {
    type: [Number, String],
    default: 200,
  },
  //是否开启监听modelValue变化
  watch_active: {
    type: Boolean,
    default: true,
  },
  //是否开启线
  show_line: {
    type: Boolean,
    default: true,
  },
});
let tabs_info = [];
const emit = defineEmits(["update:modelValue", "change"]);
const t_tabs_line = ref(null);
const t_tabs = ref(null);

// 更新缓存配置信息
const update_tabs_info = () => {
  const { options, list } = props;
  if (options instanceof Object) {
  } else {
    console.error("options 必须是一个对象");
    return false;
  }
  if (!list.length) return false;
  if (options.size == "max") {
    t_tabs.value.classList.add("t-tabs-max");
  } else {
    t_tabs.value.classList.remove("t-tabs-max");
  }
  const children = t_tabs.value.children;
  [].slice.call(children).forEach((item, index) => {
    tabs_info[index] = {
      left: item.offsetLeft,
      width: item.scrollWidth,
    };
  });
  return true;
};
onMounted(() => {
  const { watch_active } = props;
  update_tabs_info() && change_tabs(0, false);
  if (watch_active) {
    watch(
      () => props.modelValue,
      (newVal) => {
        if (newVal == -1) return;
        change_tabs(newVal, false);
      }
    );
  }
});

const change_tabs = (index, ignore = true) => {
  const { scroll, scroll_space, modelValue, show_line } = props;

  const { left, width } = tabs_info[index];
  if (show_line) {
    t_tabs_line.value.style.width = width + "px";
    t_tabs_line.value.style.left = left + "px";
  }

  if (!(ignore && index == modelValue)) {
    emit("update:modelValue", index);
    emit("change", index);
  }

  if (scroll) {
    scroll_callback(left, scroll_space);
  }
};

const scroll_callback = (left, width) => {
  const w = t_tabs.value.clientWidth;
  t_tabs.value.scrollTo({
    left: left - Number(width),
    behavior: "smooth",
  });
};
</script>

<style scoped lang="scss">
.t-tabs {
  display: flex;
  position: relative;
  cursor: pointer;
  overflow: auto;
  width: 100%;
  user-select: none;

  .t-tabs-card {
    line-height: 1.5;
    text-align: center;
    border-bottom: 2px solid var(--t-theme-empty);
    white-space: nowrap;

    > div {
      padding: 0.5em 1.5em;
    }
  }

  .t-tabs-line {
    position: absolute;
    left: 0px;
    bottom: 0;
    height: 2px;
    background-color: var(--t-theme-color);
    transition: all 0.2s ease-in-out;
  }

  .t-tabs-active {
    color: var(--t-theme-color);
  }
}

.t-tabs-max {
  width: 100%;

  > div {
    flex-grow: 1;
    flex-shrink: 1;
  }
}
</style>
