<template>
	<div class="button_group" :class="`${props.class} ${type}`">
		<div v-for="(item, index) in data"
			:class="{ focus: currentNum === index, last: (currentNum === index + 1), next: (currentNum === index - 1) }"
			:key="index" @click="_click(item, index)">
			{{ key(item) }}
		</div>
	</div>
</template>
<script>
export default {
	name: 'TButtonGroup'
}
</script>
<script setup>
import data from '../data/index'
import { computed, ref } from "vue";
const props = defineProps({
	//按钮组数据
	data: {
		type: Array,
		default: () => []
	},
	//指定渲染的key值
	key: {
		type: String,
		default: ''
	},
	//按钮组class
	class: {
		type: String,
		default: ''
	},
	type: {
		type: String,
	},
	//是否禁用相同按钮的多次点击效果
	identical: {
		type: Boolean,
		default: true
	},
	//默认获取焦点的索引
	default: {
		type: [String, Number],
		default: 0
	}
})

const emit = defineEmits([
	'click'
])

const currentNum = ref(Number(props.default))

const _click = (item, index) => {
	if (props.identical && currentNum == index) return
	currentNum.value = index
	emit('click', item, index)
}
const key = (value) => {
	if (props.key) {
		return value[props.key] || data.text
	} else {
		return value
	}
}
</script>

<style scoped lang="scss">
.button_group {
	cursor: pointer;
	//获取焦点后的css
	--t-bg: #18A058;
	--t-cc: #18A058;

	>div {
		padding: 5px 15px;
		border: 1px solid;
		min-width: 20px;
		display: inline-block;
		line-height: 15px;
		font-size: 14px;
		text-align: center;
		border-right: 1px solid transparent;
	}

	>div:last-child {
		border-right: 1px solid;
	}

	>.round:last-child {
		border-bottom-right-radius: 10px;
		border-top-right-radius: 10px;

	}

	>.roundv:first-child {
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
	}

	>.focus {
		border: 2px solid var(--t-bg);
		box-shadow: 0 0 0 3px rgba(52, 213, 11, 0.1);
		color: var(--t-cc);
	}

	.next {
		border-left: 1px solid transparent;
	}

}
</style>