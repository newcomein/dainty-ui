<script>
    export default {
        name: "da-render-node",
        props: {
            init: {
                type: Function,
                required: true
            }
        },
        render(createElement, context) {
            return this.init(createElement, context);
        }
    }
</script>

<style lang="less" scoped>

</style>