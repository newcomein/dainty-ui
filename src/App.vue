<template>
    <div id="app">
        <da-radio :options="init[0]"></da-radio>
    </div>
</template>

<script>
    import DaRadioGroup from "@/components/da-radio-group"
    import DaRadio from "@/components/da-radio"

    export default {
        components: {DaRadioGroup, DaRadio},
        data() {
            return {
                init: [
                    {
                        field: "sex",
                        label: "性别dcsdcs",
                        checked: true
                    }
                ]
            }
        },
        watch: {},
        methods: {}
    }
</script>
<style lang="less">
    @import "./assets/style/index.less";
</style>
