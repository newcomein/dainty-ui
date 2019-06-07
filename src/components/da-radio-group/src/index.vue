<template>
    <div ref="da-radio-group" class="flex flex-inline da-radio-group">
        <da-radio></da-radio>
    </div>
</template>

<script>
    import DaRadio from "../../da-radio"

    export default {
        name: "da-radio",
        components: {DaRadio},
        props: {
            init: {
                type: Array,
                required: false,
                default: () => []
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/style/index.less";
</style>