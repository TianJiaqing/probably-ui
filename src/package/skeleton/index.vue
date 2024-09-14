<template>
    <div class="t-skeleton" :style="css_style" v-if="props._show">
    </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
    _width: {
        type: [Number, String],
        default: "400"
    },
    _height: {
        type: [Number, String],
        default: "400"
    },
    _show: {
        type: Boolean,
        default: true
    },
    _style: {
        type: Object,
        default: () => ({})
    }
})

const getObjectStyle = _t.getObjectStyle

const css_style = getObjectStyle(
    {
        width: props._width + 'px',
        height: props._height + 'px',
        ...props._style
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
    background-color: #ccc;
    animation: opacity-s 2s linear infinite forwards alternate-reverse;
}
</style>