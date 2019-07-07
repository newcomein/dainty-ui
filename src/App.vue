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
                init: [
                    {
                        id: "aaaa",
                        isSelect: false,
                        render: {
                            left: (createElement, context) => {
                                return createElement("div", {
                                    class: "flex"
                                })
                            },
                            center: (createElement) => {
                                return createElement("div", "fadfaf", {
                                    class: "flex"
                                })
                            }
                        }
                    },
                    {
                        id: "aaaa1",
                        isSelect: true,
                        render: {
                            left: (createElement, context) => {
                                return createElement("div", {
                                    class: "flex"
                                })
                            },
                            center: (createElement) => {
                                return createElement("div", "fadfaf", {
                                    class: "flex"
                                })
                            }
                        }
                    }
                ]
            }
        },
        watch: {
            async selectedIds() {
                console.log(this.selectedIds)
            }
        },
        methods: {}
    }
</script>
<style lang="less">

</style>
