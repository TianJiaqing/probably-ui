<template>
	<p :style="props._style" ref="ellipsis">
		<span v-if="props._context"></span>
		<slot v-else></slot>
	</p>
</template>
<script>
export default {
	name: 'TEllipsis'
}
</script>
<script setup>
import { ref, onMounted, watch } from "vue";
const props = defineProps({
	_context: {
		default: '',
		type: String
	},
	_style: {
		default: () => ({}),
		type: Object
	},
	_width: {
		type: [Number, String],
		default: '200px'
	},
	_line: {
		type: Number,
		default: 1
	}
})
const ellipsis = ref(null)
onMounted(() => {
	ellipsis.value.style['-webkit-line-clamp'] = props._line
	ellipsis.value.style['width'] = props._width
})
</script>

<style scoped lang="scss">
p {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
}
</style>