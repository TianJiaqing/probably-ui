import TButton from './button/index.vue'
import index from './index.vue'

import { message } from './message/index.js'

import TBackTop from './backTop/index.vue'
import TButtonGroup from './buttonGroup/index.vue'
import TEllipsis from './ellipsis/index.vue'
import TInput from './input/index.vue'
import TLoading from './loading/index.vue'
import TSwitch from './switch/index.vue'
const coms = [TButton, TBackTop, TButtonGroup, TEllipsis, TInput, TLoading, TSwitch]

export {
	message
}
const install = function (Vue) {
	coms.forEach((com, index) => {
		Vue.component(com.name, com)
	})
}
export default install