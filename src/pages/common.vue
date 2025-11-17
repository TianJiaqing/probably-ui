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
            <T-button type="warning" :loading="loading">warning</T-button>
        </div>
        <div class="btn_div">
            <p>禁用状态</p>
            <T-button type="warning" disabled>warning</T-button>
        </div>
        <div class="btn_div">
            <p>type="default"</p>
            <T-button type="default">default</T-button>
        </div>
        <div class="btn_div">
            <p>type="error"</p>
            <T-button type="error" :loading="loading">error</T-button>
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
            <T-switch v-model="form.switch_demo_2" background="#f00" />
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
            <T-dialog v-if="form.dialog_demo_2" title="您需要遵守xx用户协议" @_click="dialog_demo_2_fn"
                :button="dialog_demo_2_btn" />
        </div>
        <div class="btn_div">
            <p>去掉上方横线</p>
            <T-button @click="form.dialog_demo_3 = true">点击唤起弹窗</T-button>
            <T-dialog v-if="form.dialog_demo_3" @_click="form.dialog_demo_3 = false" :line="false">
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
            <T-button @click="open_new_message">点击唤起Message</T-button>
        </div>
        <h3>标签页(Tabs)</h3>
        <hr>
        <div class="desc">正常使用 v-model='{{ form.tabs_demo_1 }}'</div>
        <T-tabs v-model="form.tabs_demo_1" @change="tabs_demo_1_change" :list="tabs_demo_list"></T-tabs>
        <div class="desc">自定义颜色 大小 v-model='{{ form.tabs_demo_2 }}'</div>
        <T-tabs v-model="form.tabs_demo_2" :options="{ size: 'max' }" active_class="demo_active_class"
            :list="tabs_demo_list" line_class="line_class"></T-tabs>

        <div class="desc">超出宽度处理 v-model='{{ form.tabs_demo_3 }}'</div>
        <T-tabs v-model="form.tabs_demo_3" :options="{ size: 'max' }" active_class="demo_active_class"
            :list="tabs_demo_list_3" line_class="line_class"></T-tabs>
        <div class="desc">自定义插槽 v-model='{{ form.tabs_demo_3 }}'</div>
        <T-tabs v-model="form.tabs_demo_3" :options="{ size: 'max' }" active_class="demo_active_class"
            :show_line="false" :list="tabs_demo_list_3" line_class="line_class">
            <template #default="{ item, index }">
                <div class="tab_item_slot" :class="{ tab_item_active: index === form.tabs_demo_3 }">
                    {{ item.name }}
                </div>
            </template>
        </T-tabs>
        <div style="height: 400px;"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const loading = ref(false);
const _defaut = {
    switch_demo_1: false,
    switch_demo_2: false,

    dialog_demo_1: false,
    dialog_demo_2: false,
    dialog_demo_3: false,
    dialog_demo_4: false,
    tabs_demo_1: 0,
    tabs_demo_2: 0,
    tabs_demo_3: 0,


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
const tabs_demo_list_3 = [
    {
        name: '迪迦',
        id: 1,
    }, {
        name: "泰罗",
        id: 2,
    }, {
        name: "梦比优斯",
        id: 3,
    }, {
        name: "贝利亚",
        id: 4,
    }, {
        name: "戴拿",
        id: 5,
    }, {
        name: "高斯",
        id: 6,
    }, {
        name: "捷德",
        id: 7,
    },
    {
        name: "诺亚",
        id: 8,
    }, {
        name: "雷欧",
        id: 9,
    },
    {
        name: "不知名1",
        id: 10,
    }, {
        name: "不知名2",
        id: 11,
    },
    {
        name: "不知名3",
        id: 12,
    }, {
        name: "不知名4",
        id: 13,
    }, {
        name: "不知名5",
        id: 14,
    }, {
        name: "不知名6",
        id: 15,
    }
]


const form = ref(_defaut)

setInterval(() => {
    loading.value = !loading.value;
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
        title: "window._diaLog",
        text: "返回一个promise",
        button: dialog_demo_2_btn
    }).then(res => {
        console.log('点击了确定');
    }).catch(err => {
        console.log('点击了取消');
    })
}




const open_new_message = () => {
    const _message = window._message
    _message({
        title: "消息来了",
        duration: 2000,
        type: "warning"
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
        background-color: red;
    }

    .tab_item_slot {
        padding: 8px 12px;
    }

    .tab_item_active {
        position: relative;
        background-color: #18a058;
        font-weight: 700;
        color: #fff;
        border-radius: 8px 8px 0 0;

        &::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: -14px;
            width: 14px;
            display: block;
            height: 14px;
            background-color: #f2f2f2;
            // border-radius: 0 0 16rpx 16rpx;
            background: radial-gradient(circle at 0 0,
                    transparent 14px,
                    #18a058 15px);
        }

        &::after {
            content: "";
            display: block;
            position: absolute;
            bottom: 0;
            right: -14px;
            width: 14px;
            height: 14px;
            background-color: #f2f2f2;
            // border-radius: 0 0 16rpx 16rpx;
            background: radial-gradient(circle at right 0,
                    transparent 14px,
                    #18a058 15px);
        }
    }
}
</style>