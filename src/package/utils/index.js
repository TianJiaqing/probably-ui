import { unref, ref } from "vue";



const useFetch = async (func, immediate, callback) => {
    if (unref(immediate) == true) {
        const res = await unref(func)()
        return Promise.resolve({
            func: null,
            data: res
        })
    } else {
        const init_fn = unref(func)
        let data = ref(null)
        const init = async () => {
            const res = await init_fn()
            data.value = res
        }
        return Promise.resolve({
            func: init,
            data: data
        })
    }
}


const init = () => {
    console.log('indt--->>>>>>>>>');
}
export default {
    useFetch,
    init
}
