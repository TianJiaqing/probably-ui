<template>
	<p :style="props.style" ref="ellipsis">
		<span v-if="props.context"></span>
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
	context: {
		default: '',
		type: String
	},
	style: {
		default: () => ({}),
		type: Object
	},
	width: {
		type: [Number, String],
		default: '200px'
	},
	line: {
		type: Number,
		default: 1
	}
})
const ellipsis = ref(null)
onMounted(() => {
	ellipsis.value.style['-webkit-line-clamp'] = props.line
	ellipsis.value.style['width'] = props.width
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