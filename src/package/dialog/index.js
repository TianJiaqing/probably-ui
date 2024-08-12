import dialog from './index.vue'
import { h, createApp, render } from 'vue'
export const DiaLog = (obj) => {
	return new Promise((succ, fail) => {
		const app = createApp(dialog, {
			...obj,
			on_click: (flg) => {
				div.remove()
				flg ? succ(flg) : fail(flg)
			},
		})
		const div = document.createElement('div')
		app.mount(div)
		document.body.appendChild(div)
	})
}