<template>
    <div class="t-waterfallFlow">
        <div v-for="(item, index) in _group" :key="index" ref="waterfall">
            <div v-for="_ in item" :key="_[KEY]">
                <slot :info="_"></slot>
            </div>
        </div>
    </div>
</template>

<script>
// 瀑布流组件
export default {
    name: 'waterfallFlow'
}
</script>
<script setup>
import { onMounted, ref, watch } from 'vue';
// const KEY = "t-id"
const KEY = "index"

const props = defineProps({
    // 瀑布流数据内容
    _list: {
        type: Array,
        default: () => []
    },
    // 需要渲染几列
    _col: {
        type: [Number, String],
        default: 2
    },
    // 暂未完成（间距）
    _clearance: {
        type: Object,
        default: () => ({
            x: 0,
            y: 0
        })
    },
    // 暂未完成（自动补全、移动位置）
    _auto: {
        type: Boolean,
        default: false
    }
})
const init = () => {
    props._list.forEach((item, index) => {
        let _ = { ...item }
        _[KEY] = index
        list_group[times] ? list_group[times].push(_) : list_group[times] = [_]
        times < props._col ? times++ : times = 0
    })
    _group.value = list_group
}
let times = 0
let list_group = {}
const _group = ref(list_group)
init()
watch(() => props._list,
    (val) => {
        init(val)
    })
const waterfall = ref(null)
onMounted(() => {
})
// 计算最大、最小偏差，自动排版（未完成）
const auto_computed = () => {
    let info_list = []
    let top_list = []
    let height_list = []
    const list = [].slice.call(waterfall.value)
    list.forEach(item => {
        // console.log('list---', item.scrollHeight);
        const ele = [...item.children].at(-1)
        const info = ele.getBoundingClientRect()
        const { height, top } = info
        info_list.push(info)
        top_list.push(top)
        height_list.push(height)
    })
    let dis_top = 0
    {
        const mini = Math.min(...top_list)
        const max = Math.max(...top_list)
        dis_top = (max * 1000 - mini * 1000) / 1000
    }
    let dis_height = 0
    {
        const mini = Math.min(...height_list)
        const max = Math.max(...height_list)
        dis_height = (max * 1000 - mini * 1000) / 1000
    }
}
</script>

<style scoped lang="scss">
.t-waterfallFlow {
    display: flex;

    >div {
        flex: 1;
    }
}
</style>