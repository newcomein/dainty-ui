<template>
    <div id="app">
        <da-select-spread :init="init" :selectedIds.sync="selectedIds"></da-select-spread>
        <da-icon name="iconfont-ic_unionpay"></da-icon>
        <da-radio-group :init="radios"></da-radio-group>
        <da-form :init="aform"></da-form>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                selectedIds: [],
                init: [],
                radios: [
                    {
                        label: "label",
                        checked: false
                    }
                ],
                aform: [
                    {
                        label: "用户名",
                        mode: "input",
                        value: "",
                        field: "username"
                    },
                    {
                        label: "用户名2",
                        mode: "input",
                        value: "",
                        field: "username2",
                        placeholder: "吃啥"
                    }
                ]
            }
        },
        // components: {DaIcon},
        watch: {
            async selectedIds() {
                console.log(this.selectedIds)
            }
        },
        methods: {
            aaaaa(createElement) {
                return createElement("div", "图标");
            }
        },
        created() {
            this.init.push({
                id: "aaaa",
                title: "dasda",
                isSelect: false,
                render: {
                    left: (createElement, context) => {
                        return createElement("da-icon", {
                            props: {
                                name: "iconfont-ic_unionpay"
                            },
                        })
                    }
                }
            })
            this.init.push({
                id: "aaaa2",
                title: "dasda",
                isSelect: true
            })
        }
    }
</script>
<style lang="less">

</style>
