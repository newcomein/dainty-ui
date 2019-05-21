<template>
    <div id="app">
        <DAForm :init="init"></DAForm>
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
                        label: "用户名",
                        type: "input"
                    }
                ]
            }
        }
    }
</script>

<style lang="less">

</style>
