<template>
    <div ref="da-radio" class="flex flex-inline da-radio">
        <div class="flex flex-inline input-box" @click="$set(options,'checked',!options.checked)">
            <span class="flex flex-inline radio" :class="[{checked:options.checked}]"></span>
        </div>
        <label class="flex flex-inline">
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
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/style/index.less";
</style>