<template>
    <div ref="da-input" class="flex da-input" @click="options.on.click({position:'line',source:options})"
         v-if="isReady">
        <div class="flex line-box">
            <label class="flex flex-inline">
                <span>{{options.label}}</span>
            </label>
            <div class="flex flex-inline input-box">
                <input v-model="options.value" type="text" @focus="focus" @blur="blur"
                       :readonly="options.readonly"
                       :autofocus="options.autofocus"
                       :placeholder="focusLineIndex===options.field?'':options.placeholder"
                       @click.stop="options.on.click({position:'input-box',source:options})">

                <!--delete位置插槽-->
                <div class="flex flex-inline slot-delete">
                    <slot :name="options.positionSlots.delete.name"
                          v-if="options.positionSlots.delete"></slot>
                    <slot name="delete" v-else>
                        <da-icon class="da-icon delete" name="feather-x"
                                 @click="isDelete(options)"
                                 v-show="options.options.isShowDelete&&options.value.length!==0">
                        </da-icon>
                    </slot>
                </div>

                <div class="flex error-message">
                    <p>{{options.ruleResult.message}}</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import DaIcon from "../../da-icon/src"
    import utils from "@/utils"

    //实例注册存储
    const registerList = new Set();

    export default {
        name: "da-input",
        components: {DaIcon},
        props: {
            options: {
                type: Object,
                required: true
            },
            isPass: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            return {
                //初始化为不显示
                isReady: false,
                focusLineIndex: null,
                parentVnode: {},//父组件
            }
        },
        watch: {
            async options() {
                this.start();
            }
        },
        methods: {
            async blur() {
                if (this.options.fixAutofocus) {
                    this.focusLineIndex = null;
                }
            },
            async focus() {
                if (this.options.fixAutofocus) {
                    this.focusLineIndex = this.options.field;
                }
            },
            async isDelete(item) {
                item.value = "";
                item.on.click({position: 'delete', source: item});
            },
            async getAutofocus() {
                //当前组件首个获得聚焦 清除placeholder
                for (let i of registerList) {
                    if (i.$options.propsData.options.autofocus) {
                        i.$data.focusLineIndex = i.$options.propsData.options.field;
                        break;
                    }
                }
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
                        this.$set(item, "ruleResult", await this.checkValue(item));
                        //监听ruleResult变化
                        await this.watchRuleResult(item, index);
                    });
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

                    //父组件不是da-form的时候 不具备 引用源 排斥源 功能

                    if (!isPass) {
                        message = i.message || "格式错误";
                        break;
                    }
                }

                return {isPass, message};
            },
            async watchRuleResult(item = {}, index = 0) {
                const newVal = await item.ruleResult;
                if (!newVal.isPass) {
                    this.$emit("update:isPass", false);
                } else {
                    this.$emit("update:isPass", true);
                }
            },
            async start() {
                const isDaForm = this.parentVnode.componentOptions.tag === "da-form";
                this.focusLineIndex = null;
                await utils.loopInputAllField([this.options]);
                this.options = await utils.initInputAttributes(this.options);
                //启动修正焦点模式
                if (this.options.fixAutofocus) {
                    this.getAutofocus();
                }
                //如果外层不是da-form组件的话 则进行正则判断机制
                if (!isDaForm) {
                    this.watchValue(this.options);
                }
                this.isReady = true;
            },
        },
        created() {
            this.parentVnode = this.$parent.$vnode;
            //储存当前注册的实例
            registerList.add(this);
            this.start();
        }
    }
</script>