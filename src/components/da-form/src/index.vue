<template>
    <div class="flex da-form">
        <form class="flex">

            <div class="flex line" :field="[item.field]" v-for="(item,index) of initForm" :key="index"
                 v-if="item.type==='input'">
                <label class="flex flex-inline">
                    <span>{{item.label}}</span>
                </label>
                <div class="flex flex-inline input-box">
                    <input v-model="item.value" type="text" :readonly="item.readonly" :autofocus="item.autofocus"
                           :placeholder="item.placeholder">
                    <da-icon class="da-icon" :name="icons.delete"></da-icon>
                </div>
            </div>

        </form>
    </div>
</template>

<script>
    import "@/assets/style/common/index.less"
    import DaIcon from "../../da-icon/src/index";
    import utils from "@/utils"

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
                for (let i = 0, len = val.length; i < len; i++) {
                    let item = val[i];
                    item = await this.initAttributes(item);
                    this.watchValue(item, i);
                }
            }
        },
        data() {
            return {
                initForm: [],
                icons: {
                    delete: "feather-x"
                },
            }
        },
        methods: {
            async initAttributes(item) {
                if (utils.getDataType(item.autofocus) === "undefined") {
                    item.autofocus = true
                }
                if (utils.getDataType(item.readonly) === "undefined") {
                    item.readonly = false
                }
                if (utils.getDataType(item.trim) === "undefined") {
                    item.trim = true
                }
                //事件
                if (utils.getDataType(item.on) === "undefined") {
                    item.on = {
                        async input({newVal, oldVal, source}) {
                        }
                    };
                }
                if (utils.getDataType(item.on.input) === "undefined") {
                    item.on.input = async function ({newVal, oldVal, source}) {

                    }
                }
                return item;
            },
            async watchValue(item = {}, index = 0) {
                this.$watch(async () => item.value, async (newVal, oldVal) => {
                    newVal = await newVal;
                    oldVal = await oldVal;
                    if (item.trim) {
                        newVal = newVal.trim();
                    }
                    if (newVal !== oldVal) {
                        item.on.input({newVal, oldVal, source: item})
                    }
                })
            },
            async checkValue(item) {

            }
        },
        created() {
            this.initForm = this.init;
        }
    }
</script>

<style lang="less" scoped>
    .da-form {
        form {
            .line {
                height: 0.6rem;
                padding: 0 0.12rem;
                background-color: white;

                label, .input-box {
                    height: 100%;
                }

                label {
                    flex: 0.7;
                }

                .input-box {
                    flex: auto;

                    input {
                        flex: auto;
                    }

                    .da-icon {
                        flex: 0.25;
                        font-size: 0.25rem;
                        justify-content: flex-end;
                        right: -0.05rem;
                    }
                }
            }
        }
    }
</style>