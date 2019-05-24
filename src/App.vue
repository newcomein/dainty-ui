<template>
    <div id="app">
        <da-form :init="init" :isPass.sync="isPass">
        </da-form>
        <button @click="getInit">获取init</button>
    </div>
</template>

<script>
    import {DaForm} from "@/components"

    export default {
        components: {DaForm},
        data() {
            return {
                isPass: false,
                init: [
                    {
                        field: "username",
                        label: "真实姓名",
                        rules: [
                            {quoteField: "username2",required:true},
                            // {required: true, pattern: /^[1-9a-zA-Z]{1}[0-9a-zA-Z]{1,14}$/, message: '格式错误'},
                        ]
                    },
                    {
                        field: "username2",
                        label: "真实姓名2",
                        rules: [
                            // {required: true, pattern: /^[1-9a-zA-Z]{1}[0-9a-zA-Z]{1,14}$/, message: '格式错误'},
                        ]
                    }
                ]
            }
        },
        watch: {
            async isPass(val) {
                console.log("通过状态:",val)
            }
        },
        methods: {
            async getInit() {
                console.log("init", this.init)
            }
        },
        mounted() {
        }
    }
</script>

<style lang="less">

</style>
