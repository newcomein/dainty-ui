<template>
    <div ref="da-radio" class="flex flex-inline da-radio">
        <template v-for="(item,index) of init">
            <da-radio :options="item" :key="index"></da-radio>
        </template>
    </div>
</template>

<script>
    import DaRadio from "../../da-radio"

    export default {
        name: "da-radio-group",
        components: {DaRadio},
        props: {
            init: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="less" scoped>

</style>