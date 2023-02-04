import dialog from './index.vue'
import { h, createApp, render } from 'vue'
export const DiaLog = (obj) => {
	const app = createApp(dialog, {
		...obj,
		on_click: (flg) => {
			console.log(flg);
			div.remove()
		},
	})
	const div = document.createElement('div')
	app.mount(div)
	document.body.appendChild(div)
}