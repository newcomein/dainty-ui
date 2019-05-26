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
                        rules: [{required: "9999"}]
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
        created() {
            // for (let i = 0; i <= 100; i++) {
            //     this.init[0][String(i) + "333"] = "ooooo"
            // }
        }
    }
</script>

<style lang="less">

</style>
