<template>
    <div ref="da-radio-group" class="flex flex-inline da-radio-group" v-if="aaa">
        <template v-for="(item,index) of init">
            <da-radio :key="index"></da-radio>
        </template>
    </div>
</template>

<script>
    import DaRadio from "@/components/da-radio"

    export default {
        name: "da-radio",
        components: {DaRadio},
        data() {
            return {
                aaa: false
            }
        },
        props: {
            init: {
                type: Array,
                required: false,
                default: () => []
            }
        },
        mounted() {
            setTimeout(() => {
                this.aaa = true;
                console.log(this.init)
            },1000)
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/style/index.less";
</style>