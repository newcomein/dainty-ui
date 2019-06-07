<template>
    <div id="app">
        <da-form :init="init"></da-form>
        <!--        <da-radio :options="options"></da-radio>-->
    </div>
</template>

<script>
    import DaRadio from "@/components/da-radio"
    import DaForm from "@/components/da-form"

    export default {
        components: {DaRadio, DaForm},
        data() {
            return {
                options: {
                    field: "1",
                    label: "选项1"
                },
                init: [
                    {
                        field: "test",
                        value: "",
                        mode: "input",
                        label: "测试"
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
