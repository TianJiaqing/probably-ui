import messageComponent from './message.vue'
import { h, createApp, render } from 'vue'
export const message = (obj) => {
	const app = createApp({
		render() {
			return h(messageComponent, {
				...obj,
				on_message: (flg) => {
					if (!flg) {
						div.remove()
					}
				}
			})
		}
	})
	const div = document.createElement('div')
	app.mount(div)
	document.body.appendChild(div)
}