<template>
	<div class="dialog">
		<h1 v-if="props._title">{{ props._title }}</h1>
		<div>
			<slot></slot>
		</div>
		<div class="btn">
			<button @click="emitFn(false)">取消</button>
			<button @click="emitFn(true)" class="success">确认</button>
		</div>
	</div>
	<div class="background" v-if="props._background"></div>
</template>

<script setup>
const props = defineProps({
	_title: {
		type: String,
		default: ''
	},
	_background: {
		type: Boolean,
		default: true
	}
})
const emit = defineEmits([
	'_click'
])
const emitFn = (boolean) => {
	emit('_click', boolean)
}
</script>

<style scoped lang="scss">
.dialog {
	background-color: white;
	z-index: 999;
	position: fixed;
	width: 400px;
	min-height: 200px;
	left: 50%;
	top: 50%;
	border: 1px solid rgba(0, 0, 0, 0.5);
	transform: translateX(-50%) translateY(-50%);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 15px;

	h1 {
		font-size: 20px;
		font-weight: 400;
		padding: 0;
		margin: 0;
	}

	.btn {
		display: flex;
		justify-content: end;

		button {
			padding: 5px 15px;
			border-radius: 5px;
			border: 2px solid #E2E2E2;
			font-size: 14px;
			cursor: pointer;
		}

		.success {
			color: white;
			background-color: #36AD6A;
			margin-left: 20px;
		}
	}
}

.background {
	width: 100vw;
	height: 100vh;
	position: fixed;
	left: 0;
	// display: none;
	top: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 99;
}
</style>