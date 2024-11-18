<template>
	<div class="loading" ref="loading">
		<span class="iconfont icon-jiazai" :class="obj[props.type] || obj.line" :style="{color:props.color}"></span>
	</div>
</template>
<script>
export default {
	name: 'TLoading'
}
</script>
<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
	type: {
		default: 'line',
		type: String
	},
	color: {
		default: '#18A058',
		type: String
	}
})
const obj = {
	line: 'icon-jiazai',
	particle: 'icon-jiazai1',
	round: 'icon-jiazailoadding'
}
const loading = ref(null)
</script>

<style scoped lang="scss">
.loading {
	.iconfont {
		font-size: 60px;
	}

	display: inline-block;
	animation: tran 1.5s linear infinite;
}

@keyframes tran {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}

}
</style>