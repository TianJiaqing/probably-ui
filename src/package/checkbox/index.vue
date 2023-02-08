<template>
	<div class="" :style="{ 'color': props._color }">
		<span class="iconfont" :class="_class" @click="emitFn"></span>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
	// _color控制图标颜色
	_color: {
		type: String,
		default: '#666666'
	},
	// _half控制是否有半选状态
	_half: {
		type: Boolean,
		default: false
	}
})
const emit = defineEmits(['_click'])
// 图标的类名数组，这些类名是我自己iconfont图标库上面的，每个人应该不一样
// icon-checkbox-weixuan为没选中的图标类名，icon-checkbox-xuanzhong为选中的，icon-checkbox-xuanzhongbufen为半选状态的
const classArr = ['icon-checkbox-weixuan', 'icon-checkbox-xuanzhong']
const classHelf = ['icon-checkbox-weixuan', 'icon-checkbox-xuanzhongbufen', 'icon-checkbox-xuanzhong']
const num = ref(0)
const _class = computed(() => {
	//半选状态采用classHelf
	// 无半选采用classArr
	if (props._half) {
		return classHelf[num.value % classHelf.length]
	}
	return classArr[num.value % classArr.length]
})
const emitFn = () => {
	num.value++
	// 自定义事件_click的值，半选状态为0、1、2，非半选为0、1
	emit('_click', num.value % (props._half ? 3 : 2))
}
</script>

<style scoped lang="scss">
span {
	cursor: pointer;
}
</style>