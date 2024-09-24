<template>
    <div class="pages_waterfallFlow">
        <h3>正常使用</h3>
        <hr>
        <div>
            <T-waterfallFlow :_list="list" _col="5">
                <template #default="{ info }">
                    <div class="card" :style="css_style(info.index, 1)">
                        <div class="img" :style="css_style(info.img, 2)"></div>
                        <div class="title txt">卡片标题</div>
                        <div class="des txt">卡片内容</div>
                    </div>
                </template>
            </T-waterfallFlow>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const BASE_URL = "https://game.gtimg.cn/images/lol/act/img";
const img_list = [
    "/champion/Sett.png",
    "/champion/Darius.png",
    "/champion/Vladimir.png",
    "/champion/Sona.png",
    "/champion/Zed.png",
    "/champion/MissFortune.png",
    "/champion/Lux.png",
];

const list = new Array(60).fill(null).map((item, index) => ({ index: index, img: BASE_URL + img_list[index % img_list.length] }))
const getObjectStyle = window._t.getObjectStyle
const css_style = (info, type) => {
    if (type == 1) {
        return getObjectStyle(
            {
                // "--h": random() + 'px',
                "--h": info % 4 * 40 + 40 + 'px',
                "--s": info % 4 * 40 + 40 + 'px',
            }
        )
    } else if (type == 2) {
        return getObjectStyle(
            {
                "--img": "url(" + info + ")"
            }
        )
    }
}
const random = () => parseInt(Math.random() * 50 + 150)
</script>

<style lang='scss' scoped>
.pages_waterfallFlow {
    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 5px 2.5px;
        background-color: rgb(89, 138, 138);
        border-radius: 4px;
        padding: 1em;

        .txt {
            width: 100%;
            margin: .2em 0;
        }

        .title {
            font-weight: 900;
            font-size: 18px;
        }

        .des {
            width: 100%;
            font-size: 16px;
        }

        .img {
            height: var(--h);
            width: var(--h);
            // background: var(--img);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center;
            opacity: .9;
        }
    }
}
</style>