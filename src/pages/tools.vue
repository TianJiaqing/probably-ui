<template>
    <div class="pages_tools">
        <h3>checkType</h3>
        <hr>
        <p>list={{ list }}</p>
        <div class="btn-div">
            <T-button @click="callback_fn('checkType', 'array')" _type="default">checkType(list,'array')</T-button>
            <T-button @click="callback_fn('checkType', 'Array')" _type="default">checkType(list,'Array')</T-button>
            <T-button @click="callback_fn('checkType', 'Object')" _type="default">checkType(list,'Object')</T-button>
        </div>
        <h3>recode</h3>
        <hr>
        <p>list={{ recode_array }}</p>
        <p>obj={{ recode_obj }}</p>
        <div class="btn-div">
            <T-button @click="callback_fn('recode1', '0')" _type="default">recode(list,'0')</T-button>
            <T-button @click="callback_fn('recode1', '0,1')" _type="default">recode(list,'0,1')</T-button>
            <T-button @click="callback_fn('recode1', [0, 1])" _type="default">checkType(list,[0,1])</T-button>
            <T-button @click="callback_fn('recode2', 'name')" _type="default">recode(obj,'name')</T-button>
            <T-button @click="callback_fn('recode2', 'name,age')" _type="default">recode(obj,'name,age')</T-button>
        </div>
        <h3>getUrlParam</h3>
        <hr>
        <p>url={{ getUrlParam_url }}</p>
        <div class="btn-div">
            <T-button @click="callback_fn('getUrlParam')" _type="default">getUrlParam(url)</T-button>
            <T-button @click="callback_fn('getUrlParam', 'param1')" _type="default">getUrlParam(url,'param1')</T-button>
            <T-button @click="callback_fn('getUrlParam', ['param1', 'param2'])"
                _type="default">getUrlParam(url,['param1','param2'])</T-button>
        </div>
        <h3>getObjectStyle</h3>
        <hr>
        <p>obj={{ getObjectStyle_obj }}</p>
        <div class="btn-div">
            <T-button @click="callback_fn('getObjectStyle')" _type="default">getUrlParam(obj)</T-button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const list = [1, 2, 3]

const recode_array = ['div1', 'div2', 'div3']
const recode_obj = {
    name: 'tjq',
    age: 18
}
const getUrlParam_url = "https://abc123.com/?param1=value1&param2=value2"
const getObjectStyle_obj = {
    fontSize: "40px",
    width: "200px",
    height: "200px",
}
const callback_fn = (e, info) => {
    const _t = window._t
    const checkType = _t.checkType
    const recode = _t.recode
    const getUrlParam = _t.getUrlParam
    const getObjectStyle = _t.getObjectStyle
    switch (e) {
        case "checkType":
            {
                const res = checkType(list, info)
                window._DiaLog({ _title: "提示", _text: `checkType(list,${info})=${res}` }).then(res => {
                }).catch()
            }
            break;
        case "recode1":
            {
                const res = recode(recode_array, info)
                window._DiaLog({ _title: "提示", _text: `recode(list,${info})=${JSON.stringify(res)}` }).then(res => {
                }).catch()
            }
            break
        case "recode2":
            {
                const res = recode(recode_obj, info)
                window._DiaLog({ _title: "提示", _text: `recode(obj,${info})=${JSON.stringify(res)}` }).then(res => {
                }).catch()
            }
            break
        case "getUrlParam":
            {
                const res = getUrlParam(getUrlParam_url, info)
                window._DiaLog({ _title: "提示", _text: `getUrlParam(url,${info})=${JSON.stringify(res)}` }).then(res => {
                }).catch()
            }
            break
        case "getObjectStyle":
            {
                const res = getObjectStyle(getObjectStyle_obj)
                window._DiaLog({ _title: "提示", _text: `getObjectStyle(obj)='${res}'` }).then(res => {
                }).catch()
            }
            break
        default:
            break;
    }
}
</script>

<style lang='scss' scoped>
.btn-div {
    display: flex;
}
</style>