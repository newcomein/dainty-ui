<template>
    <div class="flex da-form" v-if="isReady">

        <form class="flex">

            <!--普通输入框-->
            <da-input :data-field="[item.field]" v-for="(item,index) of initForm" :key="item.field+'_'+index"
                      v-if="item.type==='input'">
            </da-input>


        </form>
    </div>
</template>

<script>
    import "@/assets/style/common/index.less"
    import DaInput from "../../da-input/src";
    import utils from "@/utils"

    export default {
        name: "da-form",
        components: {DaInput},
        props: {
            init: {
                type: Array,
                required: true
            },
            isPass: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        watch: {
            async init(val) {
                this.initForm = val;
            },
            async initForm() {
                this.restart();
            }
        },
        data() {
            return {
                //表单初始化为不显示
                isReady: false,
                focusLineIndex: null,
                requiredField: new Map(),
                initForm: this.init,
                icons: {
                    delete: "feather-x"
                },
            }
        },
        methods: {
            async blur(index = null) {
                this.focusLineIndex = null;
            },
            async focus(index = null) {
                this.focusLineIndex = index;
            },
            async isDelete(item) {
                item.value = "";
                item.on.click({position: 'delete', source: item});
            },
            async watchValue(item = {}, index = 0) {
                //避免重复复监听
                if (!item._isWatchValue) {
                    item._isWatchValue = true;
                    this.$watch(async () => item.value, async (newVal, oldVal) => {
                        newVal = await newVal;
                        oldVal = await oldVal;
                        if (item.trim) {
                            newVal = newVal.trim();
                        }
                        item.value = newVal;
                        item.on.input({newVal, oldVal, source: item});
                        item.ruleResult = await this.checkValue(item);
                        //监听ruleResult变化
                        await this.watchRuleResult(item, index);
                    });
                }
            },
            async watchRuleResult(item = {}, index = 0) {
                const newVal = await item.ruleResult;
                if (!newVal.isPass) {
                    this.$emit("update:isPass", false);
                } else {
                    let checkAllField = true;
                    for (const i of this.requiredField) {
                        if (!i[1].ruleResult.isPass) {
                            this.$emit("update:isPass", false);
                            return;
                        }
                        this.$emit("update:isPass", true);
                    }

                    for (let i of this.initForm) {
                        if (i._calls.checkQuoteField) {
                            checkAllField = await i._calls.checkQuoteField();
                            if (!checkAllField) {
                                break;
                            }
                        }
                        if (i._calls.checkExcludeField) {
                            checkAllField = await i._calls.checkExcludeField();
                            if (!checkAllField) {
                                break;
                            }
                        }
                    }

                    if (checkAllField) {
                        this.$emit("update:isPass", true);
                    } else {
                        this.$emit("update:isPass", false);
                    }
                }
            },
            async checkValue(item) {
                let isPass = true;
                let message = "";

                for (let i of item.rules) {
                    //必填
                    if (i.required && item.value.length === 0) {
                        isPass = false;
                    }
                    //正则
                    if (i.pattern && !i.pattern.test(item.value)) {
                        isPass = false;
                    }
                    //非必填且存在正则,输入值为空的情况下,校正isPass结果为true
                    if (i.pattern && !i.required && item.value.length === 0) {
                        isPass = true;
                    }

                    //引用源 当前value必须与引用源的value相匹配
                    if (i.quoteField) {
                        utils.anyFor(this.initForm, async (_item, index) => {
                            if (_item.field === i.quoteField) {
                                if (_item.value !== item.value) {
                                    isPass = false
                                }
                            }
                        });
                    }

                    //排斥源 当前value必须与排斥源的value不匹配
                    if (i.excludeField) {
                        utils.anyFor(this.initForm, async (_item, index) => {
                            if (_item.field === i.excludeField) {
                                if (_item.value === item.value) {
                                    isPass = false
                                }
                            }
                        });
                    }

                    if (!isPass) {
                        message = i.message || "格式错误";
                        break;
                    }
                }

                //检查所有字段规则
                utils.anyFor(this.initForm, async (i, index) => {
                    utils.anyFor(i.rules, async (i2, index2) => {
                        if (i2.quoteField === item.field) {
                            if (i.value !== item.value) {
                                this.$set(i, "ruleResult", {isPass: false, message: "quoteField"});
                                i._calls.checkQuoteField = async () => {
                                    delete i._calls.checkQuoteField;
                                    return false
                                }
                            }
                        }
                        if (i2.excludeField === item.field) {
                            if (i.value === item.value) {
                                this.$set(i, "ruleResult", {isPass: false, message: "excludeField"});
                                i._calls.checkExcludeField = async () => {
                                    delete i._calls.checkExcludeField;
                                    return false
                                }
                            }
                        }
                    })
                });

                return {isPass, message};
            },
            async initAttributes(item) {

                const itemKeys = [];
                utils.anyFor(item, async (item, i) => itemKeys.push(i));

                if (itemKeys.indexOf("type") <= -1 || item.type.length === 0) {
                    item.type = "input"
                }
                if (itemKeys.indexOf("autofocus") <= -1) {
                    item.autofocus = true
                }
                if (itemKeys.indexOf("readonly") <= -1) {
                    item.readonly = false
                }
                if (itemKeys.indexOf("trim") <= -1) {
                    item.trim = true
                }
                if (itemKeys.indexOf("rules") <= -1) {
                    item.rules = [];
                }
                if (itemKeys.indexOf("slots") <= -1) {
                    item.slots = [];
                }
                //位置插槽
                if (itemKeys.indexOf("positionSlots") <= -1) {
                    item.positionSlots = {};
                }
                if (itemKeys.indexOf("options") <= -1) {
                    item.options = {};
                }
                //不可修改  仅做内部数据处理
                if (itemKeys.indexOf("_calls") <= -1) {
                    item._calls = {};
                }

                //正则判断结果  父组件修改无效
                item.ruleResult = {isPass: false, message: ""};


                //选项
                item.options = Object.assign({
                    isShowDelete: true
                }, item.options);


                //事件
                if (itemKeys.indexOf("on") <= -1) {
                    item.on = {};
                }

                item.on = Object.assign({
                    async input({newVal, oldVal, source}) {
                        return true
                    },
                    async click({position, source}) {
                        return true
                    }
                }, item.on);
            },
            async filterRequiredField(val) {
                let fields = null;
                for (const i of val.rules) {
                    if (i.required) {
                        fields = {key: val.field, value: val};
                        break;
                    }
                }
                return fields;
            },
            async loopAllField() {
                const fields = {};
                utils.anyFor(this.initForm, async (item, i) => {

                    if (!Object.keys(item).includes("field") || !Object.keys(item).includes("value")) {
                        throw {
                            message: "field,value不能为空",
                            data: item
                        };
                    }

                    if (!fields[item.field]) {
                        fields[item.field] = 0;
                    }

                    fields[item.field]++;
                    if (fields[item.field] > 1) {
                        throw {
                            message: `${item.field}不能重复`,
                            data: item
                        };
                    }

                })
            },
            async restart() {
                const val = this.initForm;
                //重新初始化data
                this.focusLineIndex = null;
                this.requiredField = new Map();

                //检查重复的字段 和 value 是否正确
                this.loopAllField(val);

                utils.anyFor(val, async (item, i) => {

                    //初始化属性
                    await this.initAttributes(item);

                    //避免首个autofocus导致placeholder会闪
                    if (item.autofocus && utils.getDataType(this.focusLineIndex) === "null") {
                        this.focusLineIndex = i;
                    }

                    //监听变化的字段
                    this.watchValue(item, i);

                    //筛选必填字段
                    const filterRequiredField = await this.filterRequiredField(item);
                    if (filterRequiredField) {
                        this.requiredField.set(filterRequiredField.key, filterRequiredField.value);
                    }

                });

                //显示form
                this.isReady = true;
            }
        },
        created() {
            this.restart();
        }
    }
</script>

<style lang="less" scoped>

    .da-form {
        form {

        }
    }
</style>