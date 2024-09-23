<template>
	<div class="switch" @click="_emit" :value="props.modelValue" :class="{ right: status, left: !status }"
		:style="{ background: props._background }">
		<div></div>
	</div>
</template>

<script>
// 开关组件
export default {
	name: 'TSwitch'
}
</script>
<script setup>
import { ref } from 'vue';

const props = defineProps({
	modelValue: {
		type: [Boolean],
		default: false
	},
	// 开关背景色
	_background: {
		type: String,
		default: ''
	},
	// 开关大小（未实现）
	_size: {
		type: String,
		default: 'medium'
	}

})
const _defaut = props.modelValue
const emit = defineEmits([
	'_input', 'update:modelValue'
])
let num = Boolean(props.modelValue)
const status = ref(num % 2)
// 更新开关状态
const update_status = () => {
	status.value = num % 2
}
const _emit = () => {
	num++
	update_status()
	emit("update:modelValue", Boolean(num % 2));
}
</script>

<style scoped lang="scss">
.switch {
	border-radius: 25px;
	width: 40px;
	height: 20px;
	background-color: #DBDBDB;
	border: 1px solid #DBDBDB;
	cursor: pointer;
	display: flex;
	align-items: center;
	position: relative;

	>div {
		margin: 0 5px;
		width: 15px;
		height: 15px;
		border: 1px solid #DBDBDB;
		border-radius: 50%;
		position: absolute;
		transition: all .2s linear;
		left: 0%;
		background-color: white;
	}

}

.right {
	background-color: #18A058;

	>div {
		left: 100%;
		transform: translateX(calc(-100% - 10px));
	}
}

.left {
	background-color: #DBDBDB !important;

	>div {
		left: 0%;

	}
}
</style>