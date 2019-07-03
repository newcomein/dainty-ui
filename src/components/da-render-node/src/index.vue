<script>
    export default {
        name: "da-render-node",
        render: function (createElement) {
            var func = function () {
                return {
                    template: '<div>哈哈哈哈哈</div>'
                }
            }
            console.log(createElement)
            return createElement(func())
        }
    }
</script>