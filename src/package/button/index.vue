<template>
	<div class="button">
		<button @click="_emit" :class="`${props._type} ${props._size}`" :style="_style">
			<slot></slot>
		</button>
	</div>
</template>
<script>
export default {
	name: 'TButton'
}
</script>
<script setup>
import { ref } from "vue";
const props = defineProps({
	_type: {
		default: 'primary',
		type: String
	},
	_size:
	{
		default: 'medium',
		type: String
	},
	_style: {
		default: '',
		type: String
	},
})
const emit = defineEmits([
	'click'
])
const _emit = () => {
	emit('click')
}
</script>

<style scoped lang="scss">
button {
	border: 2px solid transparent;
	border-radius: 5px;
	margin: 10px;
	font-size: 14px;
	font-weight: 500;
	font-family: inherit;
	background-color: #666666;
	cursor: pointer;
	transition: border-color 0.25s;
}

button:hover {
	border-color: #666;
	opacity: 0.6;
	transition: all 1s linear;
}

button:focus,
button:focus-visible {

	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0);
}

button {
	background-color: #f9f9f9;
}

.primary {
	background-color: #18A058;
	color: white;
}

.warning {
	background-color: #F0A020;
	color: white;
}

.default {
	color: black;
	background-color: rgba(0, 0, 0, 0.1);
}

.success {
	background-color: #4098FC;
	color: white;
}

.error {
	background-color: #D03050;
	color: white;
}

.medium {
	padding: 5px 15px;
}

.large {
	padding: 5px 20px;
	font-size: 18px;
}

.small {
	padding: 2px 5px;
	font-size: 12px;
}
</style>