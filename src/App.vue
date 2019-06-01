<template>
    <div id="app">
        <da-form :init="init" :isPass.sync="isPass">
        </da-form>
        <button @click="getInit">获取init</button>
    </div>
</template>

<script>
    import DaForm from "@/components/da-form"

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
                        mode: "input",
                        rules: [{required: true}],
                        placeholder: "fsdfsdf",
                    },
                    {
                        field: "password",
                        label: "密码",
                        value: "",
                        mode: "input",
                        placeholder: "222222",
                        type: "captcha",
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
