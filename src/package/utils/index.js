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

//为什么要写这个？这个没有为什么。
/**
 * checkType
 * @param val - 目标内容
 * @param type - 类型
 * @returns true/false(目标内容是否满足当前的类型)
 */
const checkType = (val, type) => {
    if (type && typeof (type) == 'string') {
        let upper_case = type[0].toUpperCase()
        let lower_case = type.substr(1).toLowerCase()
        return Object.prototype.toString.call(val) == `[object ${upper_case + lower_case}]`
    } else {
        console.warn('function:checkType warning! ', 'target:', val, 'type:', type)
        return false
    }
}

// 为什么写这个？在es6结构赋值时取出来的属性，此时如果想赋值给一个新的函数，只能push、或者打点赋值。
/**
 * recode
 * @param target - 目标内容
 * @param key - 提取的属性名，可以传递字符、数组
 * @param byt - 可以不用传递
 * @returns [] || {} - 拼接重组完成后的内容
 */
const recode = (target, key, byt = ',') => {
    let obj;
    let keys
    if (key) {
        keys = checkType(key, 'String') ? key.split(byt) : checkType(key, 'Array') ? key : []
        if (keys.length == 0) {
            return obj
        }
    }
    if (checkType(target, 'Array') && (obj = [])) {
        keys.forEach(item => {
            obj.push(target[item])
        })
    } else if (checkType(target, 'Object') && (obj = {})) {
        keys.forEach(item => {
            obj[item] = target[item]
        })
    }
    return obj
}


// 为什么写这个？在处理路由页面传递的参数时，或许会有用到的场景
/**
 * getUrlParam
 * @param url - url地址（url不能主动填写a-z A-Z 0-9 _之外的其他符号）
 * @param key - 提取的属性名，可以传递字符、数组
 * @returns {} || [] || String - 拼接重组完成后的内容，依据key值的填写内容决定
 */
const getUrlParam = (url, key) => {
    //demo url:https://abc123.com/?param1=value1&param2=value2
    const list = url.split('?')
    if (list.length > 2) {
        console.error('function:getUrlParam error!')
        return {}
    } else {
        try {
            const info = list.at(-1)
            // const a = '=[a-zA-Z0-9_-]*'
            const str = info.replaceAll('&', "',").replaceAll('=', ":'") + "'"
            let fn = new Function('return {' + str + '}')
            const res = fn()
            fn = null
            if (!key) {
                return res
            }
            if (key && checkType(key, 'String')) {
                return res[key]
            } else if (key && checkType(key, 'Array')) {
                const list = []
                key.forEach(item => {
                    list.push(res[item])
                })
                return list
            }
        } catch (error) {
            console.error('function:getUrlParam error!' + error)
            return {}
        }
    }

}


//为什么要写这个？每次写object赋值为style时都要恶心死我。
/**
 * getObjectStyle
 * @param data - 目标内容
 * @returns string(字符串内容为行内css)
 */
const getObjectStyle = (data = {}) => {
    const info = unref(data)
    let css = ""
    if (!checkType(info, 'Object')) return css
    for (const key in info) {
        css += `${key}:${info[key]};`
    }
    return css
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

    checkType,
    recode,
    getUrlParam,
    getObjectStyle
}

