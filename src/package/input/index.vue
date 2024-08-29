<template>
	<span @click="_focus" :class="{ span_focus: is_focus }" v-if="props._title" :style="_title_style">{{ props._title
		}}</span>
	<textarea :value="props.modelValue" @input="_emit" name="" id="" cols="30" rows="10" :disabled="props._disabled"
		v-if="props._type === 'textarea'" :class="{ dis: props._disabled }" ref="input" :style="_style"
		@focus="is_focus_change(true)" @blur="is_focus_change(false)"></textarea>
	<input :type="props._type" v-else :class="{ dis: props._disabled }" :value="props.modelValue" @input="_emit"
		@focus="is_focus_change(true)" @blur="is_focus_change(false)" :disabled="props._disabled" ref="input"
		:style="_style">
</template>
<script>
export default {
	name: 'TInput'
}
</script>

<script setup>
import { ref } from "vue";
const props = defineProps({
	_type: {
		default: 'text',
		type: String
	},
	_style: {
		default: '',
		type: String
	},
	_disabled: {
		type: [Boolean, String],
		default: false
	},
	_title: {
		default: '',
		type: String
	},
	_title_style: {
		default: '',
		type: String
	},
	_select_title: {
		type: [Boolean, String],
		default: true
	},
	// 响应式原理modelValue 搭配update:modelValue自定义事件完成双向绑定
	modelValue: {
		type: [Number, String, null, undefined],
		default: ''
	}
})
const emit = defineEmits([
	'_input', 'update:modelValue'
])
const _emit = (e) => {
	emit('_input', e.target.value)
	emit("update:modelValue", e.target.value);
}
const _defaut = props.modelValue

const input = ref(null)
const _focus = () => {
	input.value.focus()
}
const _select = () => {
	input.value.select()
}
const _blur = () => {
	input.value.blur()
}
const _reset = () => {
	emit("update:modelValue", _defaut);
}
const _clear = () => {
	emit("update:modelValue", undefined);
}
// 事件暴露出去，方便以后父组件进行调用子组件的方法
defineExpose({
	_focus,
	_select,
	_blur,
	_reset,
	_clear,
})

const is_focus = ref(false)
const is_focus_change = (bool) => {
	if (props._select_title) {
		is_focus.value = bool
	}
}
</script>

<style scoped lang="scss">
input,
textarea {
	border-radius: 5px;
	border: 1px solid #E0E0E6;
	outline: none;
	padding: 5px 10px;
	margin: 5px 0;
	color: var(--t-theme-text-color);
}

input:focus,
textarea:focus {
	border-color: var(--t-theme-color);
	box-shadow: 0 0 0 2px var(--t-theme-shadow);
}

.dis {
	cursor: not-allowed;
}

span {
	font-size: 14px;
	padding: 0px 5px;
	cursor: pointer;

	&.span_focus {
		color: var(--t-theme-color);
	}
}
</style>