<template>
    <div class="t_bgcard">
        <div class="t_bgcard_contain" ref="contain"><slot></slot></div>
    </div>
</template>

<script>
// 开关组件
export default {
    name: 'TBgCard'
}
</script>
<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    // 设置容器宽度，默认为图片的宽度
    _width: {
        type: [String, Number],
        default: 0
    },
    // 默认高度，仅在图片失效时启用
    _height: {
        type: [String, Number],
        default: 200
    },
    // 图片地址
    _url: {
        type: String,
        default: null
    },
    // 图片比例模式
    _mode: {
        type: String,
        default: "widthFix"
    }
})
const contain = ref(null)


onMounted(() => {
    const { _width, _height, _url } = props
    if (_url) {
        const img = new Image()
        img.src = _url
        img.onload = (e) => {
            const { width, height } = img
            if (_width) {
                const h = _width * height / width
                set_style(_width, h, _url)

            } else {
                set_style(width, height, _url)

            }
        }
        img.onerror = (e) => {
            set_style(_width, _height, null)
        }
    }
})

const set_style = (width = null, height, url) => {
    console.log("width", width, height, url);
    let ele = contain.value
    if (ele) {
        width && (ele.style.width = width + 'px')
        ele.style.height = height + 'px'
        url && (ele.style.backgroundImage = 'url(' + url + ')')
    }
}
const _emit = () => {

}
</script>

<style scoped lang="scss">
.t_bgcard {
    .t_bgcard_contain {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
    }
}
</style>