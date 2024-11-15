<template>
    <div class="pages_common">
        <h3>按钮组件(Button)</h3>
        <hr>
        <div class="btn_div">
            <p>正常状态</p>
            <T-button>默认</T-button>
        </div>
        <div class="btn_div">
            <p>加载状态</p>
            <T-button _type="warning" :_loading="_loading">warning</T-button>
        </div>
        <div class="btn_div">
            <p>禁用状态</p>
            <T-button _type="warning" _disabled>warning</T-button>
        </div>
        <div class="btn_div">
            <p>_type="default"</p>
            <T-button _type="default">default</T-button>
        </div>
        <div class="btn_div">
            <p>_type="error"</p>
            <T-button _type="error" :_loading="_loading">error</T-button>
        </div>
        <h3>开关组件(Switch)</h3>
        <hr>
        <div class="btn_div">
            <p>正常使用</p>
            <T-switch v-model="form.switch_demo_1" />
            <p class="status">当前的值：{{ form.switch_demo_1 }}</p>
        </div>
        <div class="btn_div">
            <p>自定义颜色</p>
            <T-switch v-model="form.switch_demo_2" _background="#f00" />
            <p class="status">当前的值：{{ form.switch_demo_2 }}</p>
        </div>
        <h3>弹窗组件(Dialog)</h3>
        <hr>
        <div class="btn_div">
            <p>正常使用</p>
            <T-button @click="form.dialog_demo_1 = true">点击唤起弹窗</T-button>
            <T-dialog v-if="form.dialog_demo_1" @_click="form.dialog_demo_1 = false" />
        </div>
        <div class="btn_div">
            <p>自定义底部按钮(css&事件&数量)</p>
            <T-button @click="form.dialog_demo_2 = true">点击唤起弹窗</T-button>
            <T-dialog v-if="form.dialog_demo_2" _title="您需要遵守xx用户协议" @_click="dialog_demo_2_fn"
                :_button="dialog_demo_2_btn" />
        </div>
        <div class="btn_div">
            <p>去掉上方横线</p>
            <T-button @click="form.dialog_demo_3 = true">点击唤起弹窗</T-button>
            <T-dialog v-if="form.dialog_demo_3" @_click="form.dialog_demo_3 = false" :_line="false">
                <template #default>
                    哎呀，我的线呢？
                </template>
            </T-dialog>
        </div>
        <div class="btn_div">
            <p>一句话唤起一个弹窗</p>
            <T-button @click="open_new_dialog">点击唤起弹窗</T-button>
        </div>
        <h3>消息组件(Message)</h3>
        <hr>
        <div class="btn_div">
            <p>正常使用</p>
            <T-button @click="open_new_message">点击唤起弹窗</T-button>
        </div>
        <h3>标签页(Tabs)</h3>
        <hr>
        <div class="desc">正常使用 v-model='{{ form.tabs_demo_1 }}'</div>
        <T-tabs v-model="form.tabs_demo_1" @change="tabs_demo_1_change" :list="tabs_demo_list"></T-tabs>
        <div class="desc">自定义颜色 大小 v-model='{{ form.tabs_demo_2 }}'</div>
        <T-tabs v-model="form.tabs_demo_2" :options="{ size: 'max' }" active_class="demo_active_class"
            :list="tabs_demo_list" line_class="line_class"></T-tabs>
        <div style="height: 400px;"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const _loading = ref(false);
const _defaut = {
    switch_demo_1: false,
    switch_demo_2: false,

    dialog_demo_1: false,
    dialog_demo_2: false,
    dialog_demo_3: false,
    dialog_demo_4: false,
    tabs_demo_1: 0,
    tabs_demo_2: 0,


}
const tabs_demo_list = [
    {
        name: '用户管理',
        id: 1,
    }, {
        name: "角色管理",
        id: 2,
    }, {
        name: "3",
        id: 3,
    }
]



const form = ref(_defaut)

setInterval(() => {
    _loading.value = !_loading.value;
}, 5000);



const dialog_demo_2_btn = [{
    title: '考虑下',
    type: 'warning',
},
{
    title: '拒绝',
    type: 'error',
    custom_event: () => {
        console.log(`使用了自定义事件`)
    },
    keep_dailog: true
},
{
    title: '好吧',
}
]
const dialog_demo_2_fn = (val) => {
    console.log('dialog_demo_2_fn-->', val);
    form.value.dialog_demo_2 = false
}
const open_new_dialog = () => {
    const _dialog = window._diaLog
    _dialog({
        _title: "window._diaLog",
        _text: "返回一个promise",
        _button: dialog_demo_2_btn
    }).then(res => {
        console.log('点击了确定');
    }).catch(err => {
        console.log('点击了取消');
    })
}




const open_new_message = () => {
    const _message = window._message
    _message({
        _title: "消息来了",
        _duration: 2000,
        _type: "warning"
    })
}

const tabs_demo_1_change = (val) => {
    console.log('tabs_demo_1_change-->', val);
}

</script>

<style lang='scss' scoped>
.pages_common {
    >.btn_div {
        display: flex;
        align-items: center;
        padding: .5em 0;

        p {
            margin-right: 1em;
        }

        .status {
            margin: 0 1em;
        }
    }

    .desc {
        line-height: 2;
        margin: 1em 0;
    }

    :deep(.demo_active_class) {
        color: red;
    }

    :deep(.line_class) {
        background-color: blue;
    }
}
</style>