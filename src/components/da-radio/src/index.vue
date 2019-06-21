<template>
    <div ref="da-radio" class="flex flex-inline da-radio">
        <div class="flex flex-inline input-box" @click="options.checked=!options.checked">
            <span class="flex flex-inline radio" :class="[{checked:options.checked},{isFirstTime}]"></span>
        </div>
        <label class="flex flex-inline" v-if="options.label">
            <span>{{options.label}}</span>
        </label>
    </div>
</template>

<script>

    export default {
        name: "da-radio",
        props: {
            options: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                isFirstTime: true
            }
        },
        mounted() {
            setTimeout(() => {
                //首次加载取消动画
                this.isFirstTime = false;
            }, 500);
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/style/index.less";
</style>