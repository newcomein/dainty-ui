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
                        value: "",
                    },
                    {
                        field: "username2",
                        label: "真实姓名2",
                        value: "",
                    }
                ]
            }
        },
        watch: {
            async isPass(val) {
                console.log("通过状态:", val)
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
