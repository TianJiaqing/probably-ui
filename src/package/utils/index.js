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
        return Object.prototype.toString.call(val)
    }
}

// 为什么写这个？在es6结构赋值时取出来的属性，此时如果想赋值给一个新的函数，只能push、或者打点赋值。
/**
 * recode
 * @param target - 目标内容
 * @param key - 提取吃属性名，可以传递字符、数组
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
const init = () => {
    console.log('indt---');
}

export default {
    useFetch,
    init,
    checkType,
    recode
}
