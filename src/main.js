import {
    createApp
} from 'vue'
import './style.css'
// import './iconfont.css'
// import com from '../build/my-lib.js'
import com from "probably-ui"
import "probably-ui/style.css";
// import '../build/style.css'
import com2, {
    message,
    DiaLog
} from "./package/index"



import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'



import func from "./package/utils/index"

// let { checkType, recode } = func

let arr = [1, 2, 3]




// window.__init = func.init
window.__message = message
window._DiaLog = DiaLog


window._diaLog = DiaLog
window._message = message


import router from './router/index'

import App from './App.vue'
// import 'animate.css';
const _ = createApp(App)
_.use(router).use(hljsVuePlugin).use(com2).mount('#app')

console.log('--checkType', _t.checkType([], 'array'));
console.log("--recode(arr, '1,2')", _t.recode(arr, '1,2'));
console.log("--recode(arr, '1,2')", _t.recode({ name: "1", age: '18' }, 'name'));
console.log("--recode(arr, '1,2')", _t.recode({ name: "1", age: '18' }, 'name,age'));
console.log("--getUrlParam", _t.getUrlParam("www.baidu.com?a=1&b=2&c=3&d=4", ['a', 'b', 'c']));
console.log("--getUrlParam", _t.getUrlParam("www.baidu.com?a=1&b=2&c=3&d=4"));
console.log('--getObjectStyle', _t.getObjectStyle({ fontSzie: "20px" }));
let obj = {
    name: 1,
    age: 18,
    key: 2
}
// Object.prototype.forEach = function (e) {
//     const list = Object.keys(this)
//     list.forEach(item => e(item))
// }
// obj.forEach(item => {
//     console.log('item', item);
// })

