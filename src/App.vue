<template>
    <div id="app">
        <da-radio :options="options"></da-radio>
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
                    field: "sex",
                    label: "性别dcsdcs",
                    checked: true
                }
            }
        },
        watch: {},
        methods: {}
    }
</script>
<style lang="less">
    @import "./assets/style/index.less";
</style>
