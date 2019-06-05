<template>
    <div id="app">
        <da-radio :options="options"></da-radio>
    </div>
</template>

<script>
    import DaRadio from "@/components/da-radio"

    export default {
        components: {DaRadio},
        data() {
            return {
                options: {
                    field: "1",
                    label: "选项1"
                }
            }
        },
        watch: {},
        methods: {}
    }
</script>
