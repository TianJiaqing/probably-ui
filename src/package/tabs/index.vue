<template>
    <div class="t-tabs" ref="t_tabs" v-if="list.length">
        <div v-for="(item, index) in list" :key="index" :class="`t-tabs-card ${(modelValue == index) && active_class}`"
            @click="change_tabs(index)">
            <div>{{ item.name }}</div>
        </div>
        <div class="t-tabs-card" style="flex-grow: 1;flex-shrink: 1;" v-if="options.size == 'auto'">
        </div>
        <div :class="`t-tabs-line ${line_class}`" ref="t_tabs_line"></div>
    </div>
</template>
<script>
// tabs组件
export default {
    name: 'TTabs'
}
</script>
<script setup>
import { onMounted, ref } from 'vue';

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
            size: 'auto' //max || auto  最大宽度 || 自适应宽度
        })
    },
    //自定义列表
    list: {
        type: Array,
        default: () => [],
    },
})
let tabs_info = []
const emit = defineEmits([
    'update:modelValue', 'change'
])
const t_tabs_line = ref(null)
const t_tabs = ref(null)


// 更新缓存配置信息
const update_tabs_info = () => {
    const { options, list } = props;
    if (options instanceof Object) { } else {
        console.error('options 必须是一个对象');
        return false;
    }
    if (!list.length) return false
    if (options.size == 'max') {
        t_tabs.value.classList.add('t-tabs-max');
    } else {
        t_tabs.value.classList.remove('t-tabs-max');
    }
    const children = t_tabs.value.children;
    [].slice.call(children).forEach((item, index) => {
        tabs_info[index] = {
            left: item.offsetLeft,
            width: item.scrollWidth,
        }
    })
    return true
}
onMounted(() => {
    update_tabs_info() && change_tabs(0, false)
})

const change_tabs = (index, ignore = true) => {
    if (ignore && index == props.modelValue) return;
    emit('update:modelValue', index)
    emit('change', index)
    const { left, width } = tabs_info[index];
    t_tabs_line.value.style.width = width + 'px';
    t_tabs_line.value.style.left = left + 'px';

}
</script>

<style scoped lang="scss">
.t-tabs {
    display: flex;
    position: relative;
    cursor: pointer;

    .t-tabs-card {
        line-height: 1.5;
        text-align: center;
        padding: .5em 1.5em;
        border-bottom: 2px solid var(--t-theme-empty);
    }

    .t-tabs-line {
        position: absolute;
        left: 0px;
        bottom: 0;
        height: 2px;
        background-color: var(--t-theme-color);
        transition: all .2s ease-in-out;
    }

    .t-tabs-active {
        color: var(--t-theme-color);
    }
}

.t-tabs-max {
    width: 100%;

    >div {
        flex-grow: 1;
        flex-shrink: 1;
    }
}
</style>