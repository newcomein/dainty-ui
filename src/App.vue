<template>
    <div id="app">
        <da-select-spread :init="init"></da-select-spread>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                init: [
                    {
                        title: 'fsdfsdfad',
                        isSelect: false,
                        render: {
                            left: {
                                template: `<div class="flex">fdsfsdf</div>`
                            }
                        }
                    }
                ]
            }
        },
        watch: {},
        methods: {}
    }
</script>
<style lang="less">

</style>
