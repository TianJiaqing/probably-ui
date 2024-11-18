<template>
    <div class="t-skeleton" :style="css_style" v-if="props._show">
    </div>
</template>

<script setup>
// 骨架屏
import { ref } from 'vue'
const props = defineProps({
    // 骨架屏宽度
    width: {
        type: [Number, String],
        default: "400"
    },
    // 骨架屏高度
    height: {
        type: [Number, String],
        default: "400"
    },
    // 骨架是否展示
    _show: {
        type: Boolean,
        default: true
    },
    // 其它css
    style: {
        type: Object,
        default: () => ({})
    },
    // 宽高单位，px、%、em...
    _unit: {
        type: String,
        default: "px"
    }
})

const getObjectStyle = _t.getObjectStyle

//object转css
const css_style = getObjectStyle(
    {
        width: props.width + props._unit,
        height: props.height + props._unit,
        ...props.style
    }
)


</script>

<style lang="scss">
@keyframes opacity-s {
    0% {
        opacity: 1;
    }

    100% {
        opacity: .2;

    }
}

.t-skeleton {
    background-color: #bbb;
    animation: opacity-s 1.5s linear infinite forwards alternate-reverse;
}
</style>