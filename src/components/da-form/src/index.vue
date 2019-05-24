<template>
    <div class="flex da-form" v-if="isReady">

        <form class="flex">

            <!--普通输入框-->
            <div class="flex line" :data-field="[item.field]" v-for="(item,index) of initForm"
                 :key="item.field+'_'+index"
                 v-if="item.type==='input'" @click="item.on.click({position:'line',source:item})">
                <label class="flex flex-inline">
                    <span>{{item.label}}</span>
                </label>
                <div class="flex flex-inline input-box">
                    <input v-model="item.value" type="text" @focus="focus(index)" @blur="blur(index)"
                           :readonly="item.readonly"
                           :autofocus="item.autofocus"
                           :placeholder="focusLineIndex===index?'':item.placeholder"
                           @click.stop="item.on.click({position:'input-box',source:item})">

                    <!--delete位置插槽-->
                    <div class="flex flex-inline slot-delete">
                        <slot :name="item.positionSlots.delete.name"
                              v-if="item.positionSlots.delete"></slot>
                        <slot name="delete" v-else>
                            <da-icon class="da-icon delete" :name="icons.delete"
                                     @click="isDelete(item)" v-if="item.options.isShowDelete">
                            </da-icon>
                        </slot>
                    </div>

                </div>
            </div>


        </form>
    </div>
</template>

<script>
    import "@/assets/style/common/index.less"
    import DaIcon from "../../da-icon/src";
    import utils from "@/utils"

    export default {
        name: "da-form",
        components: {DaIcon},
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
            async initForm(val) {
                //重新初始化data
                this.focusLineIndex = null;
                this.requiredField = {};

                //筛选重复的字段  如果字段为空则报错
                await this.filterAllField(val);
                this.requiredField = await this.filterRequiredField(val);

                for (let i = 0, len = val.length; i < len; i++) {

                    let item = val[i];

                    //初始化属性
                    item = await this.initAttributes(item);

                    //避免首个autofocus导致placeholder会闪
                    if (item.autofocus && await utils.getDataType(this.focusLineIndex) === "null") {
                        this.focusLineIndex = i;
                    }

                    this.watchValue(item, i);
                    this.watchRuleResult(item, i);
                }
                //显示form
                this.isReady = true;
            }
        },
        data() {
            return {
                //表单初始化为不显示
                isReady: false,
                focusLineIndex: null,
                initForm: [],
                icons: {
                    delete: "feather-x"
                },
                requiredField: {}
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
                this.$watch(async () => item.value, async (newVal, oldVal) => {
                    newVal = await newVal;
                    oldVal = await oldVal;
                    if (item.trim) {
                        newVal = newVal.trim();
                    }
                    item.value = newVal;
                    item.on.input({newVal, oldVal, source: item});
                    item.ruleResult = await this.checkValue(item);
                });
            },
            async watchRuleResult(item = {}, index = 0) {
                //不知道啥子原因 无法监听到ruleResult变化  暂时用value替代
                this.$watch(async () => item.value, async () => {
                    setTimeout(async () => {
                        const newVal = await item.ruleResult;
                        if (!newVal.isPass) {
                            this.$emit("update:isPass", false);
                        } else {
                            const requiredField = Object.keys(this.requiredField);
                            for (let i of requiredField) {
                                if (!this.requiredField[i].ruleResult.isPass) {
                                    this.$emit("update:isPass", false);
                                    break;
                                }
                                this.$emit("update:isPass", true);
                            }
                        }
                    }, 50);
                });
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
                        for (let _item of this.initForm) {
                            if (_item.field === i.quoteField) {
                                if (_item.value !== item.value) {
                                    isPass = false
                                }
                            }
                        }
                    }

                    //排斥源 当前value必须与排斥源的value不匹配
                    if (i.excludeField) {
                        for (let _item of this.initForm) {
                            if (_item.field === i.excludeField) {
                                if (_item.value === item.value) {
                                    isPass = false
                                }
                            }
                        }
                    }

                    if (!isPass) {
                        message = i.message || "格式错误";
                        break;
                    }
                }
                return {isPass, message};
            },
            async initAttributes(item) {
                if (utils.getDataType(item.type) === "undefined" || item.type.length === 0) {
                    item.type = "input"
                }
                if (utils.getDataType(item.autofocus) === "undefined") {
                    item.autofocus = true
                }
                if (utils.getDataType(item.readonly) === "undefined") {
                    item.readonly = false
                }
                if (utils.getDataType(item.trim) === "undefined") {
                    item.trim = true
                }
                if (utils.getDataType(item.rules) === "undefined") {
                    item.rules = [];
                }
                if (utils.getDataType(item.slots) === "undefined") {
                    item.slots = [];
                }
                if (utils.getDataType(item.positionSlots) === "undefined") {
                    item.positionSlots = {};
                }
                if (utils.getDataType(item.options) === "undefined") {
                    item.options = {};
                }

                //正则判断结果  父组件修改无效
                item.ruleResult = {isPass: false, message: ""};


                //选项
                item.options = Object.assign({
                    isShowDelete: true
                }, item.options);


                //事件
                if (utils.getDataType(item.on) === "undefined") {
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
                return item;
            },
            async filterRequiredField(val) {
                const fields = {};
                for (let i = 0, len = val.length; i < len; i++) {
                    let item = val[i];
                    for (let i2 of item.rules) {
                        if (i2.required) {
                            fields[item.field] = item;
                            break;
                        }
                    }
                }
                return fields;
            },
            async filterAllField(val = []) {
                const fields = {};
                for (let i = 0, len = val.length; i < len; i++) {
                    let item = val[i];
                    if (!item.field || item.length === 0) {
                        throw {
                            message: "field不能为空",
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
                }
            }
        },
        created() {
            this.initForm = this.init;
        }
    }
</script>

<style lang="less" scoped>

    @border-bottom-color: #e7e7e7;
    @label-color: #666666;
    @placeholder-color: #999999;
    @da-icon-color: @label-color;

    .da-form {
        form {
            .line {
                height: 0.56rem;
                padding: 0 0.12rem;
                background-color: white;
                position: relative;

                &:last-child {
                    &:after {
                        display: none;
                    }
                }

                &:after {
                    content: "";
                    width: 93.5%;
                    height: 1px;
                    background-color: @border-bottom-color;
                    position: absolute;
                    bottom: 0;
                }

                label, .input-box {
                    height: 100%;
                }

                label {
                    flex: 0.7;
                    color: @label-color;
                }

                .input-box {
                    flex: 2.6;
                    position: relative;

                    input {
                        flex: auto;
                        height: 100%;

                        &::placeholder {
                            color: @placeholder-color;
                        }
                    }

                    .slot-delete {
                        flex: 0.25;
                        justify-content: flex-end;
                        height: 100%;

                        .da-icon {
                            font-size: 0.23rem;
                            color: @da-icon-color;

                            &.delete {
                                right: -0.05rem;
                            }
                        }
                    }
                }
            }
        }
    }
</style>