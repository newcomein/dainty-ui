<template>
    <div class="flex da-form">
        <da-icon name="feather-circle"></da-icon>
        <form class="flex">
            <div class="flex line" v-for="(item,index) of init" :key="index">
                <label><span>{{item.label}}</span></label>
            </div>
        </form>
    </div>
</template>

<script>
    import "@/assets/style/common/index.less"
    import DaIcon from "../../da-icon/src/index";

    export default {
        name: "da-form",
        components: {DaIcon},
        props: {
            init: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="less" scoped>
    .da-form {

    }
</style>