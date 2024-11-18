<template>
    <div class="pages_skeleton">
        <h3>正常使用</h3>
        <hr>
        <div>
            <div>
                <T-skeleton width="300"></T-skeleton>
            </div>
            <div>
                <T-skeleton width="150"></T-skeleton>
            </div>
            <div class="line">
                <T-skeleton width="300" :height="item * 35" v-for="item in 4" :key="item"></T-skeleton>
            </div>
            <div class="list">
                <T-skeleton width="100" v-for="item in 10" :key="item" height="25"></T-skeleton>
            </div>
            <div class="list">
                <T-skeleton :width="item * 50" v-for="item in 9" :key="item" height="30"></T-skeleton>
            </div>
            <div class="round_list list">
                <T-skeleton :width="item * 30" v-for="item in 4" :key="item" :height="item * 30"></T-skeleton>
            </div>
        </div>
        <h3>搭配瀑布流使用</h3>
        <hr>
        <p style="text-align: center;font-size: 20px;">
            <span v-if="loading">数据加载中...</span>
            <span v-else>数据加载完成</span>
            <T-button @click="init">重新演示</T-button>
        </p>
        <div class="waterfallFlow">
            <T-waterfallFlow :list="list">
                <template #default="{ info }">
                    <div :style="`height: ${(random() + 1) * 30}px;margin: 10px;`" v-if="loading">
                        <T-skeleton :width="100" _unit="%" :height="100"></T-skeleton>
                    </div>
                    <p :style="`height:calc( ${random() + 1}*30px);background:rgba(0,0,255,.4);padding:0;margin:5px;'`"
                        v-else>
                        xx内容{{ info.index }}
                    </p>
                </template>
            </T-waterfallFlow>
        </div>
    </div>
</template>

<script setup>
import { nextTick, ref } from 'vue';
const list = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
const loading = ref(true)
const time = 2 * 1000
let set_time = null
const init = () => {
    set_time && clearTimeout(set_time)
    loading.value = true
    set_time = setTimeout(() => {
        list.value = new Array(20)
        loading.value = false
    }, time);
}
init()
const random = () => {
    return Math.floor(Math.random() * 10)
}
</script>

<style lang="scss">
.pages_skeleton {
    >div:first-of-type {
        display: flex;
        flex-wrap: wrap;

        >div {
            margin: 1em;
        }

        .line,
        .list {
            >div {
                margin-bottom: 1em;
            }
        }

        .round_list {
            >div {
                border-radius: 50%;
            }
        }
    }

    .waterfallFlow {
        p {
            color: green;
            text-align: center;
            font-size: 20px;
            left: 20px;
        }
    }


}
</style>