import { unref, ref } from "vue";
import $ from "../other/index.js"
const checkType = $.checkType
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




//为什么要写这个？就是一个获取对象长度的方法(很普通)。
/**
 * getSize
 * @param data - 目标内容
 * @returns Number
 */

const getSize = (data) => {
    if (data instanceof Object) {
        let size = Object.keys(data).length
        return size
    } else if (data instanceof Array) {
        return data.length
    } else if (data instanceof String) {
        return data.length
    } else {
        return 0
    }
}



export default {
    getUrlParam,
    getObjectStyle,
    getSize,
}

