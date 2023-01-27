<template>
	<div class="message" ref="message" :style="props._style">
		<div class="animate__animated animate__rotateInDownLeft">
			<span v-if="props._title"><span class="iconfont" :class="classtype"></span>{{
				props._title
			}}</span>
			<slot v-else></slot>
		</div>
	</div>
</template>


<script setup>
import { ref, onMounted, computed } from "vue";
const props = defineProps({
	_type: {
		default: 'warning',
		type: String
	},
	_style: {
		default: () => ({}),
		type: Object
	},
	_title: {
		default: '',
		type: String
	},
})
const _defaut = props.modelValue
const emit = defineEmits([
	'_message', 'update:modelValue'
])
const _emit = (e) => {
}
const message = ref(null)
onMounted(() => {
	emit('_message', true)
	const _promise = new Promise((succ, fail) => {
		setTimeout(() => {
			message.value.classList.add('remove')
			succ(null)
		}, 2000);
	})
	_promise.then((res) => {
		setTimeout(() => {
			message.value.remove()
			emit('_message', false)
		}, 1000)
	})
})
// icon-shibai1


const classObj = {
	success: 'icon-chenggong',
	warning: 'icon-jinggao',
	fail: 'icon-shibai1'
}
const classtype = computed(() => {
	if (classObj[props._type]) {
		return classObj[props._type]
	} else {
		return 'icon-jinggao'
	}
})
</script>

<style scoped lang="scss">
.message {
	position: fixed;
	top: 20px;
	left: 50%;
	transform: translateX(-50%);

	>div {
		border: 1px solid #E0E0E6;
		background-color: white;

		padding: 5px 30px;
		cursor: pointer;
		border-radius: 25px;
		font-size: 14px;

		.iconfont {
			margin: 0px 5px;
		}

		.icon-shibai1 {
			color: red;
		}

		.icon-chenggong {
			color: green;
		}

		.icon-jinggao {
			color: #F0A020;
		}
	}



}

.warning {}

.remove {
	opacity: 0;
	transition: all .5s linear;
}
</style>