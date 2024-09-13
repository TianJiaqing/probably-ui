<template>
    <div class="t-waterfallFlow">
        <div v-for="(item, index) in _group" :key="index">
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
import { ref } from 'vue';
// const KEY = "t-id"
const KEY = "index"

const props = defineProps({
    _list: {
        type: Array,
        default: () => []
    },
    _col: {
        type: Number,
        default: 2
    },
    // 暂未完成
    _clearance: {
        type: Object,
        default: () => ({
            x: 0,
            y: 0
        })
    }
})
let times = 0
let list_group = {}
const arr = props._list.forEach((item, index) => {
    times < props._col ? times++ : times = 0
    let _ = { ...item }
    _[KEY] = index
    list_group[times] ? list_group[times].push(_) : list_group[times] = [_]
})
const _group = ref(list_group)
</script>

<style scoped lang="scss">
.t-waterfallFlow {
    display: flex;

    >div {
        flex: 1;
    }
}
</style>