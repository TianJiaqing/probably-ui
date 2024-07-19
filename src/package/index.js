

import { message } from './message/index.js'
import "./style.css"

const modules = import.meta.glob('../package/**/*.vue', { eager: true })

export {
	message
}
const install = function (Vue) {

	for (const path in modules) {
		const name = path.split('/').at(-2)?.split('.')[0]
		const Component = modules[path];
		Vue.component(`T-${name}`, Component.default)
	}

}
export default install