import { unref, ref } from "vue";

/**
 * fetch函数
 * @param func - 网络请求方法
 * @param immediate - 是否立刻执行改方法
 * @param callback - 执行完毕后的回调函数
 * @returns 
 */

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






//为什么要写这个？我每次都在想，为什么本地的数据就不能像普通的数据一样调用啊？
/**
 * useStorage
 * @param data - 目标内容
 * @returns Proxy
 */


const useStorage = (data, id = '') => {
    // 唯一id，多处实例化使用不会互相覆盖
    const ID = id
    const arr = data
    /**
    const arr = [
        {
            // 本地存储的名称
            name: "userinfo",
            //描述信息，最好要有
            desc: "存储用户信息",
            // 日后可扩展功能1：时效性
            time: 7 * 1000,
            // 日后可扩展功能2：初始值
            value: {
                id: 1,
                name: "初始值"
            },
        }
    ]
    // 或者 ↓
    const arr = ['userinfo']
    */
    const _get = (val) => JSON.parse(window.localStorage.getItem(ID + val))
    const _set = (key, val) => window.localStorage.setItem(ID + key, JSON.stringify(val))
    // 代理的内容
    let STORAGE = {}
    //name的合集
    let key_list = []
    arr.forEach(item => {
        if (item instanceof Object) {
            let { name, desc = false } = item
            if (desc == false) {
                console.warn("您尚未编写注释来介绍" + name + "的作用")
            }
            key_list.push(name)
            STORAGE[name] = {
                ...item,
                ID
            }

        } else if (typeof (item) == 'string') {
            key_list.push(item)
            STORAGE[item] = item
        }


    })

    const storage = new Proxy(STORAGE, {
        get(target, key) {
            if (key === '$') {
                return _set
            } else {
                return _get(key)
            }
        },
        set(target, key, val) {
            if (key_list.includes(key)) {
                _set(key, val)
                return true
            } else {
                return false
            }
        }
    })
    return storage
}



export default {
    useFetch,
    useStorage,
}

