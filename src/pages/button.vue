<template>
    <div class="pages_button">
        <h3>正常使用</h3>
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

    </div>
</template>

<script setup>
import { ref } from 'vue'
const _loading = ref(false);

setInterval(() => {
    _loading.value = !_loading.value;
}, 5000);

</script>

<style lang='scss' scoped>
.pages_button {
    >.btn_div {
        display: flex;
    }
}
</style>