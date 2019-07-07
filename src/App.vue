<template>
    <div id="app">
        <da-select-spread :init="init" :selectedIds.sync="selectedIds"></da-select-spread>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selectedIds: [],
                init: []
            }
        },
        watch: {
            async selectedIds() {
                console.log(this.selectedIds)
            }
        },
        methods: {},
        created() {
            this.init.push({
                id: "aaaa",
                isSelect: false
            })
            this.init.push({
                id: "aaaa2",
                isSelect: true
            })
        }
    }
</script>
<style lang="less">

</style>
