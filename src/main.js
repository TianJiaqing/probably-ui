import { createApp } from 'vue'
import './style.css'
// import './iconfont.css'
// import com from '../build/my-lib.js'
import com from "probably-ui"
import "probably-ui/style.css";
// import '../build/style.css'
import com2 from "./package/index"
import func from "./package/utils/index"

console.log('func))_____',func.init);
window.__init=func.init


import App from './App.vue'
// import 'animate.css';
const ap = createApp(App)
ap.use(com2).mount('#app')

