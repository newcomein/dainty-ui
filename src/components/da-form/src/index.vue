<template>
    <div class="flex da-form" v-if="isReady">

        <form class="flex">

            <!--普通输入框-->
            <template v-for="(item,index) of initForm">
                <da-input :data-field="[item.field]" :options.sync="item" v-if="item.mode==='input'">
                </da-input>
            </template>


        </form>
    </div>
</template>

<script>
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
                this.start();
            }
        },
        data() {
            return {
                //初始化为不显示
                isReady: false,
                requiredField: new Map(),
                initForm: this.init,
            }
        },
        methods: {
            async watchValue(item = {}, index = 0) {
                //避免重复复监听
                if (!item._isWatchValue) {
                    item._isWatchValue = true;
                    const throttle = utils.throttle(100);
                    this.$watch(async () => item.value, async (newVal, oldVal) => throttle(async () => {
                        newVal = await newVal;
                        oldVal = await oldVal;

                        if (utils.getDataType(newVal) === "string") {
                            if (item.trim) {
                                newVal = newVal.trim();
                            }
                        }

                        if (item.options.ruleTrigger.change) {
                            item.value = newVal;
                            item.on.input({newVal, oldVal, source: item});
                            this.$set(item, "ruleResult", await this.checkValue(item));
                            //监听ruleResult变化
                            await this.watchRuleResult(item, index);
                        }

                    }));
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
            async filterRequiredField(val) {
                let fields = null;
                if (val.rules) {
                    for (const i of val.rules) {
                        if (i.required) {
                            fields = {key: val.field, value: val};
                            break;
                        }
                    }
                }
                return fields;
            },
            async start() {
                const val = this.initForm;
                //重新初始化data
                this.requiredField = new Map();

                //检查重要字段
                await utils.loopInputAllField(val);

                utils.anyFor(val, async (item, i) => {

                    //监听变化的字段
                    await this.watchValue(item, i);

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
            this.start();
        }
    }
</script>