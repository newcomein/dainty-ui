<template>
    <div id="app">
        <da-radio-group :init="init"></da-radio-group>
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
                        checked: true,
                        lable:"dfsdf"
                    },
                    {
                        field: "sex",
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
