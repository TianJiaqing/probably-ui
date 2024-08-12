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
import func from "./package/utils/index"
let { checkType, recode } = func
let arr = [1, 2, 3]

console.log('--checkType', checkType([], 'array'));
console.log("--recode(arr, '1,2')", recode(arr, '1,2'));
console.log("--recode(arr, '1,2')", recode({ name: "1", age: '18' }, '1,2'));

console.log('func))_____', func.init);
window.__init = func.init
window.__message = message
window._DiaLog = DiaLog



import App from './App.vue'
// import 'animate.css';
const ap = createApp(App)
ap.use(com2).mount('#app')