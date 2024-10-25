

import { message } from './message/index.js'
import { DiaLog } from './dialog/index.js'
import utils from "./utils/index"
import config from './data/index'

import "./style.css"

const modules = import.meta.glob('../package/**/*.vue', { eager: true })

export {
	message,
	DiaLog
}
const default_options = {
	// 是否需要注册工具
	need_utils: true,
	// 全局工具对象命名
	utils_name: '_t',
	//重新定义单独工具的名称
	utils_rename: null,
	// utils_rename: {
	// 	getUrlParam: 'name1'
	// },
	// 是否需要注册组件
	need_component: true,
	//默认组件名称
	component_rename: "T-",
	//默认的弹窗z-index
	z_index: 1,
	// custom_callback: (e) => { }
	need_prototype_change: true,
}


const prototype_init = () => {
	// Object.prototype.forEach = function (e) {
	// 	const list = Object.keys(this)
	// 	list.forEach(item => e(item))
	// }
}

const need_utils_init = (options) => {
	let _utils = {}
	const info = options.utils_rename
	const name = options.utils_name

	if (!info) {
		_utils = utils
	} else {
		const name_list = Object.keys(info)
		Object.keys(utils).forEach(item => {
			// 注意！：函数原型的name属性并未被修改，此处用的是浅拷贝
			const key = name_list.includes(item) ? info[item] : item
			_utils[key] = utils[item]
		})
	}
	window[name] = _utils
}

const install = function (Vue, options = default_options) {
	const v = Vue.version
	if (v < 3) {
		return
	}
	if (options.need_utils) {
		need_utils_init(options)
	}


	if (options.need_prototype_change) {
		prototype_init(options)
	}


	if (options.need_component) {
		for (const path in modules) {
			const name = path.split('/').at(-2)?.split('.')[0]
			const Component = modules[path];
			Vue.component(`${options.component_rename}${name}`, Component.default)
		}
		config.z(options.z_index)
	}


}
export default install