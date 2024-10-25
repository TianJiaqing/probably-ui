<template>
    <div class="pages_bgCard">
        <T-bgCard :_url="url_2">
            <div class="color_div">
                <div></div>
                <div></div>
            </div>
        </T-bgCard>

        <T-bgCard :_url="url"></T-bgCard>

        <T-bgCard :_url="url_3" _width="400">
            <div class="card">
                <div class="title">活动详情</div>
                <div class="des">1.用户一旦领取不能更换</div>
                <div class="des">2.用户一旦领取不能更换</div>
            </div>
        </T-bgCard>
    </div>
</template>

<script setup>
import { ref } from "vue";
const url = "http://61.136.180.50:9000/product/微信截图_20240902104601.png";
const url_2 = "https://ms.bdimg.com/pacific/0/pic/126130569_-537921332.png";
const url_3 =
    "https://img2.baidu.com/it/u=446981511,947966320&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto";
</script>

<style lang='scss' scoped>
.pages_bgCard {
    display: flex;
    padding-top: 4em;

    >div {
        margin-right: 2em;
    }

    .card {
        background: linear-gradient(to right, #fff, transparent);
        padding: 4em 1em 1em 1em;
        color: #666;
        font-size: 18px;
        line-height: 2;

        .des {
            font-size: 16px;
        }
    }

    .color_div {
        height: 100%;
        width: 66.6%;
        display: flex;

        >div {
            background-color: red;
            opacity: 0.8;
            width: 50%;
            height: 100%;
        }

        div:first-child {
            background-color: green;
        }
    }
}
</style>