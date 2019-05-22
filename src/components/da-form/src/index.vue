<template>
    <div class="flex da-form">
        <form class="flex">
            <div class="flex line" v-for="(item,index) of initForm" :key="index" v-if="item.type==='input'">
                <label class="flex flex-inline">
                    <span>{{item.label}}</span>
                </label>
                <div class="flex flex-inline">
                    <input v-model="item.value">
                    <da-icon :name="icons.delete"></da-icon>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import "@/assets/style/common/index.less"
    import DaIcon from "../../da-icon/src/index";

    export default {
        name: "da-form",
        components: {DaIcon},
        props: {
            init: {
                type: Array,
                required: true
            }
        },
        watch: {
            async init(val) {
                this.initForm = val;
            },
            async initForm(val) {
                for (const i of val) {
                    console.log(i)
                }
            }
        },
        data() {
            return {
                initForm: [],
                icons: {
                    delete: "feather-volume"
                },
            }
        },
        created() {
            this.initForm = this.init;
        }
    }
</script>

<style lang="less" scoped>
    .da-form {

    }
</style>