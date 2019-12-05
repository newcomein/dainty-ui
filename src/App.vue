<template>
    <div id="app">
        <da-icon font-size="100px" color="red" name="iconfont-ic_unionpay"
                 file-type="svg"></da-icon>
        <da-select-spread :init="init">
            vsgdvsw
            <template slot="fsdfsdfsdf">vdsgwr</template>
        </da-select-spread>
        <!--        <da-icon font-size="100px" :color="color" :file="require('@/assets/img_aggame.png')"-->
        <!--                 file-type="img"></da-icon>-->
        <!--                <da-icon font-size="100px" :color="color" name="iconfont-ic_unionpay"-->
        <!--                         file-type="svg"></da-icon>-->
        <!--                <da-icon font-size="100px" :color="color" :file="require('@/assets/ic_today_hov.svg')"-->
        <!--                         file-type="svg"></da-icon>-->
        <!--        <da-select-spread :init="init" :selectedIds.sync="selectedIds"></da-select-spread>-->
        <!--        <da-icon name="iconfont-ic_unionpay"></da-icon>-->
        <!--        <da-radio-group :init="radios"></da-radio-group>-->
        <!--        <da-form :init="aform"></da-form>-->
        <!--        <da-select-spread :init="init" :selectedIds.sync="selectedIds"></da-select-spread>-->
        <!--        <da-icon name="iconfont-ic_unionpay"></da-icon>-->
        <!--        <da-radio-group :init="radios"></da-radio-group>-->
        <!--        <da-form :init="aform"></da-form>-->

        <!--        <da-select-spread :init="init" :selectedIds.sync="selectedIds"></da-select-spread>-->
        <!--        <da-icon name="iconfont-ic_unionpay"></da-icon>-->
        <!--        <da-radio-group :init="radios"></da-radio-group>-->
        <!--        <da-form :init="aform"></da-form>-->

        <!--        <da-select-spread :init="init" :selectedIds.sync="selectedIds"></da-select-spread>-->
        <!--        <da-icon name="iconfont-ic_unionpay"></da-icon>-->
        <!--        <da-radio-group :init="radios"></da-radio-group>-->
        <!--        <da-form :init="aform"></da-form>-->

<!--        <da-dialog :isShow.sync="isShow">-->
<!--            <span slot="top"> a ascadcascasca</span>-->
<!--            cdscacasc-->
<!--        </da-dialog>-->
    </div>
</template>

<script>

    export default {
        data() {
            return {
                color: "",
                isShow: true,
                selectedIds: [],
                init: [],
                radios: [
                    {
                        label: "label",
                        checked: false,
                        isShowRadioIcon: false,
                        render: (createElement) => {
                            return createElement("div", "图标");
                        }
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
        mounted() {
            setTimeout(() => {
                this.color = "red"
                setTimeout(() => {
                    this.color = null
                    setTimeout(() => {
                        this.color = "red"
                    }, 2000)
                }, 2000)
            }, 2000)
        },
        // components: {DaIcon},
        // watch: {
        //     async selectedIds() {
        //         console.log(this.selectedIds)
        //     }
        // },
        // methods: {
        //     aaaaa(createElement) {
        //         return createElement("div", "图标");
        //     }
        // },
        created() {
            this.init.push({title:'fsdfsdf',slots:{right:'fsdfsdfsdf'}})
            console.log(this.init)
            this.$daToast({message: "测试toast"});
            setTimeout(() => {
                this.isShow = true;
                this.$daToast({message: "测试toastvdvsdsvavsdvsd"});
            }, 1000)
            // this.init.push({
            //     id: "aaaa",
            //     title: "dasda",
            //     isSelect: false,
            //     render: {
            //         left: (createElement, context) => {
            //             return createElement("da-icon", {
            //                 props: {
            //                     name: "iconfont-ic_unionpay"
            //                 },
            //             })
            //         }
            //     }
            // })
            // this.init.push({
            //     id: "aaaa2",
            //     title: "dasda",
            //     isSelect: true
            // })
        }
    }
</script>
<style lang="less">

</style>
