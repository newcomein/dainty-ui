<template>
    <div ref="da-radio" class="flex flex-inline da-radio">
        <label>
            <span>{{options.label}}</span>
        </label>
        <div class="flex flex-inline input-box">

        </div>
    </div>
</template>

<script>

    export default {
        name: "da-radio",
        props: {
            options: {
                type: Object,
                required: true
            },
            selectId: {
                type: Boolean,
                required: false,
                default: false
            }
        },
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/style/index.less";
</style>