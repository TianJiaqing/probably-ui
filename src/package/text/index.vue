<template>
    <div class="text-contain" :class="{ _select, line }" :style="{ '--t-line': line }">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "TText",
};
</script>
<script setup>
const props = defineProps({
    // 是否可选中
    _select: {
        type: Boolean,
        default: false,
    },
    //最大溢出文本行，默认0(不溢出)
    line: {
        type: Number,
        default: 0,
    },
});

</script>

<style scoped lang="scss">
.text-contain {
    user-select: none;

    &._select {
        user-select: auto;
    }

    &.line {

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: var(--t-line);
        /* 定义显示的行数，3 表示最多显示 3 行 */
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>