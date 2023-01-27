<template>
	<div class="backtop" @click="backtop" v-if="scrollLenght>50">
		<span class="iconfont icon-fanhuidingbu"></span>
	</div>
</template>
<script>
export default {
	name: 'TBackTop'
}
</script>
<script setup>
import { ref, computed, watch } from "vue";
const scrollLenght = ref(0)
const ele = document.body
ele.onscroll = (e) => {
	scrollLenght.value = document.scrollingElement.scrollTop
}
const backtop = () => {
	window.scrollTo({
		behavior: 'smooth',
		top: 0
	})
}
</script>

<style scoped lang="scss">
.backtop {
	padding: 15px 20px;
	cursor: pointer;
	border: 1px solid #E0E0E6;
	color: #666666;
	position: fixed;
	right: 20px;
	bottom: 40px;
}
</style>