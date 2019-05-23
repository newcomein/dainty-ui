<template>
    <div id="app">
        <DAForm :init="init"></DAForm>
        <button @click="getInit">获取init</button>
    </div>
</template>

<script>
    import DAForm from "./components/da-form"

    export default {
        components: {DAForm},
        data() {
            return {
                init: [
                    {
                        field: "username",
                        label: "真实姓名",
                        type: "input",
                        value: "",
                        autofocus: true,
                        readonly: false,
                        placeholder: "请填写真实姓名",
                        trim: true,
                        rules: [{required: true, pattern: /^[1-9a-zA-Z]{1}[0-9a-zA-Z]{1,14}$/, message: '格式错误'}]
                    }
                ]
            }
        },
        methods: {
            async getInit() {
                console.log("init", this.init)
            }
        }
    }
</script>

<style lang="less">

</style>
