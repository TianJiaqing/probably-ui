<template>
	<div class="switch" @click="_emit" :value="props.modelValue"
		:class="{ right: props.modelValue,left:! props.modelValue  }" :style="{background:props._background}">
		<div :style="{ background: props._color }"></div>
	</div>
</template>

<script>
export default {
	name: 'TSwitch'
}
</script>
<script setup>
const props = defineProps({
	modelValue: {
		type: [Boolean],
		default: false
	},
	_background: {
		type: String,
		default: ''
	},
	_color: {
		type: String,
		default: ''
	},
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
const _emit = () => {
	num++
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