<template>
  <T-button @click="fn">数据调试</T-button>
  <div
    class="t-list custom-scroll"
    :class="{ 't-fictitious': props._type == 1 }"
    @scroll="list_scroll"
  >
    <div class="t-list-contain" ref="list_contain">
      <div
        v-for="(item, index) in list"
        :key="index"
        @click="$emit('_select', item)"
        ref="list_ref"
      >
        <slot name="default" :info="item"></slot>
      </div>
    </div>
    <div
      v-if="props._type == 1"
      class="t-fictitious-contain"
      ref="list_fictitious"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
defineEmits(["_select"]);
const props = defineProps({
  _number: {
    type: [String, Number],
    default: 0,
  },
  _interval: {
    type: Number,
    default: 3,
  },
  _type: {
    type: String,
    default: "1",
  },
  _list: {
    type: Array,
    default: () => [],
  },
});
// 希望你能给一个预估的大小值
const fn = () => {
  console.log(cache_info);
  console.log(list_ref.value);
};
const list = ref([]);
const info = ["0", "1"];
const list_contain = ref(null);
const list_fictitious = ref(null);
const list_ref = ref([]);

onMounted(() => {
  const { _list, _type } = JSON.parse(JSON.stringify(props));
  if (!_list.length) return;
  if (_type == info[0]) {
    use_animation_frame();
  } else if (_type == info[1]) {
    use_fictitious_list();
    set_list(slice_list());
  }
});

// 方案一，优点：按照帧来进行渲染，也是最便捷的手段！缺点：数据量>30k时（以普通电脑为例），仍会造成页面卡顿
const use_animation_frame = () => {
  const { _list } = JSON.parse(JSON.stringify(props));
  const num = 500;
  if (_list.length == 0) return;
  const _init = () => {
    if (_list.length == 0) {
      cancelAnimationFrame(callback);
    } else {
      list.value.push(..._list.splice(0, num));
      requestAnimationFrame(_init);
    }
  };
  const callback = requestAnimationFrame(_init);
};

//方案二，虚拟列表
let start_dom, end_dom;
const size = 9;
//默认高度
let height = 51;

// 当前的缓存数据
let cache_info = [];
const use_fictitious_list = () => {
  const { _list } = JSON.parse(JSON.stringify(props));
  start_dom = 0;
  end_dom = size;
  list_fictitious.value.style = `height:${_list.length * height}px;`;
};

//设置list、渲染list
const set_list = (e) => (list.value = e);

//截取props._list
const slice_list = (
  start = start_dom,
  end = end_dom,
  list = JSON.parse(JSON.stringify(props._list))
) => list.slice(start, end);

//更新缓存信息
const update_cache_info = (start = start_dom, scrollTop) => {
  slice_list().forEach((item, index) => {
    const id = start + index;
    if (cache_info[id]) return;
    const ele_info = list_ref.value[index];
    const offsetHeight = ele_info.offsetHeight;
    let pre_ele = cache_info.at(-1) || {};

    {
      const last = index - 1 < 0 ? index : index - 1;
      pre_ele = pre_ele.id == last ?pre_ele:{};
      pre_ele.id == last&&  console.log('空');
    }
    const h = ele_info.offsetHeight + (pre_ele ? pre_ele.h : 0);
    cache_info[id] = { id, offsetHeight, h };
  });

  list_fictitious.value.style = `height:${
    (cache_info.at(-1).h || 0) +
    (props._list.length - cache_info.length) * height
  }px;`;
};

// 设置开始、结束索引
const update_info = (start, scrollTop) => {
  const len = props._list.length;
  if (start >= len) {
    start = len;
  }
  start_dom = start;
  end_dom = start_dom + size;
};

// 设置顶部偏移量
const set_top = (scrollTop) => {
  const top_contain = scrollTop % height;
  const num = start_dom - size;
  const list = cache_info.slice(0, end_dom);
  const h = list.reduce((pre, next) => pre + next.offsetHeight, 0);

  let len = scrollTop;
  // list_contain.value.style = `--t-top:${scrollTop - top_contain}px;`;
  list.some((item, index) => {
    len = len - item.offsetHeight;
    if (len < 0) {
      list_contain.value.style = `--t-top:${-(item.offsetHeight + len)}px;`;
      return true;
    }
  });
};
const time = 50;
let set_time = null;
const f = (fn) => {
  if (set_time) {
    return;
  } else {
    fn;
  }
};

const ele_resize = new ResizeObserver((e) => {
  console.log("元素大小变化,e-->>>>>>", e);
});
const list_scroll = (e) => {
  // if (set_time) {
  //   return;
  // } else {
  //   set_time = setTimeout(() => {
  //     set_time = null;
  //   }, time);
  // }
  if (props._type == info[1]) {
    const { scrollTop } = e.currentTarget;
    console.log("scrollTop--->>", scrollTop); //39000
    // 1、固定高度
    // const start = Math.floor(scrollTop / height);
    // 2、非固定高度
    let start = 0;
    let h = scrollTop;
    if (cache_info.length) {
      // cache_info.forEach((item) => (h += item.offsetHeight));
      const flag = cache_info.some((item, index) => {
        // h -= item.offsetHeight;
        if (h < item.h) {
          start = index;
          return true;
        }
      });
      if (!flag) {
        start = Math.ceil(scrollTop / height);
        console.log("失败----", start, list_ref.value);
      }
    }
    // const h = list

    //所有操作的前提条件！
    update_info(start, scrollTop);
    update_cache_info();

    set_top(scrollTop);
    set_list(slice_list());
  }
};
</script>

<style lang='scss' scoped>
.t-list {
  height: 400px;
  overflow-y: auto;
  display: inline-block;
  min-width: 300px;
  // width: 100%;
  position: relative;
  --t-top: 0px;
  .t-list-contain {
    height: 100%;
    transform: translateY(var(--t-top));
    width: 100%;
    > div {
      cursor: pointer;
      padding: 0 var(--t-padding);
      &:hover {
        background-color: var(--t-theme-hover);
      }
    }
  }
}
.t-fictitious {
  position: relative;
  .t-fictitious-contain {
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 100%;
    display: block;
    z-index: -1;
  }
  .t-list-contain {
    height: 100%;
    position: sticky;

    // position: absolute;
    // top: var(--t-top);
    top: 0;
    transform: translateY(var(--t-top));
    width: 100%;
  }
}
</style>