<template>
	<div class="button_group" :class="props._class" :style="props._style">
		<div v-for="(item, index) in props._data"
			:class="{ focus: currentNum === index, last: (currentNum === index + 1), next: (currentNum === index - 1) }"
			@click="_click(item, index)">
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
import { computed, ref } from "vue";
const props = defineProps({
	_data: {
		type: Array,
		default: () => []
	},
	_key: {
		type: String,
		default: ''
	},
	_class: {
		type: String,
		default: ''
	},
	_style: {
		default: () => ({}),
		type: Object
	},
})
const emit = defineEmits([
	'click'
])
const _click = (item, index) => {
	currentNum.value = index
	emit('click', item, index)
}
const currentNum = ref(0)
const key = (value) => {
	if (props._key) {
		return value[props._key]
	} else {
		return value
	}
}
</script>

<style scoped lang="scss">
.button_group {
	cursor: pointer;

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
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;

	}

	>div:first-child {
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
	}

	>.focus {
		border: 2px solid #18A058 !important;
		box-shadow: 0 0 0 3px rgba(52, 213, 11, 0.1);
	}

	.next {
		border-left: 1px solid transparent;
	}

}
</style>