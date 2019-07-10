<template>
    <div ref="da-input" class="da-flex da-input" @click="options.on.click({position:'line',source:options})"
         v-if="isReady">
        <div class="da-flex da-line-box">
            <label class="da-flex da-flex-inline positionSlots-left" v-if="options.label.length!==0">
                <slot :name="options.positionSlots.left.name"
                      v-if="options.positionSlots.left"></slot>
                <slot name="left" v-else>
                    <span>{{options.label}}</span>
                </slot>
            </label>
            <div class="da-flex da-flex-inline da-input-box">
                <input v-model="options.value" :type="options.type" @focus="focus" @blur="blur"
                       :readonly="options.readonly"
                       :autofocus="options.autofocus"
                       :disabled="options.disabled"
                       :placeholder="focusLineIndex===options.field?'':options.placeholder"
                       @click.stop="options.on.click({position:'da-input-box',source:options})">

                <!--位置插槽 right -->
                <div class="da-flex da-flex-inline da-positionSlots-right">

                    <slot :name="options.positionSlots.right.name"
                          v-if="options.positionSlots.right"></slot>

                    <slot name="right" v-else>

                        <transition mode="out-in" enter-active-class="animated faster fadeIn"
                                    leave-active-class="animated faster fadeOut">
                            <da-icon class="da-icon delete" name="feather-x"
                                     :animationClass="{}"
                                     @click.native="isDelete(options)"
                                     v-if="!options.type.match(/captcha/)&&options.options.isShowDelete && options.value.length !== 0">
                            </da-icon>
                        </transition>

                        <div class="da-flex da-flex-inline da-captcha" v-if="options.type==='captcha'">

                            <transition mode="out-in" enter-active-class="animated faster fadeIn"
                                        leave-active-class="animated faster fadeOut">
                                <span key="sendCaptcha" @click="sendCaptcha" v-if="captchaText==='获取验证码'"
                                      class="da-flex da-flex-inline da-sendCaptcha">{{captchaText}}</span>
                                <span key="captchaText" class="da-flex da-flex-inline" v-else>{{captchaText}}</span>
                            </transition>

                        </div>

                    </slot>

                </div>

                <transition enter-active-class="animated faster fadeIn" leave-active-class="animated faster fadeOut">
                    <div class="da-flex da-error-message" v-if="!ruleResult.isPass&&ruleResult.message.length>0">
                        <p>{{ruleResult.message}}</p>
                    </div>
                </transition>

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
                ruleResult: {isPass: false, message: ""},
                captchaCount: 60,
                captchaText: "获取验证码"
            }
        },
        watch: {
            async options() {
                this.start();
            },
            async captchaCount(val) {
                if (val === 60 || val <= 0) {
                    this.captchaText = "获取验证码";
                    setTimeout(() => {
                        this.captchaCount = 60;//重置计时器
                    }, 1500);
                } else {
                    this.captchaText = `${val}s后重新发送`
                }
            },
        },
        methods: {
            async blur() {
                if (this.options.fixAutofocus) {
                    this.focusLineIndex = null;
                }

                //失去焦点校验正则
                if (this.options.options.ruleTrigger.blur) {
                    //检查正则
                    this.$set(this.options, "ruleResult", await this.checkValue(this.options));
                    this.ruleResult = this.options.ruleResult;


                    //监听ruleResult变化
                    await this.watchRuleResult(this.options);
                }
            },
            async focus() {
                if (this.options.fixAutofocus) {
                    this.focusLineIndex = this.options.field;
                } else {
                    //木有启动修正焦点模式 则当前placeholder正常
                    this.focusLineIndex = null
                }
                //获得焦点校验正则
                if (this.options.options.ruleTrigger.focus) {
                    //检查正则
                    this.$set(this.options, "ruleResult", await this.checkValue(this.options));
                    this.ruleResult = this.options.ruleResult;


                    //监听ruleResult变化
                    await this.watchRuleResult(this.options);
                }
            },
            async isDelete(item) {
                item.value = "";
                item.on.click({position: 'delete', source: item});
            },
            async sendCaptcha() {
                const captchaCallBack = await this.options.options.captchaCallBack();
                if (captchaCallBack) {
                    const countTime = () => {
                        this.captchaCount--;
                        setTimeout(() => {
                            if (this.captchaCount > 0) {
                                countTime();
                            }
                        }, 1000)
                    };
                    countTime();
                }
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
                    const throttle = utils.throttle(100);
                    this.$watch(async () => item.value, async (newVal, oldVal) => throttle(async () => {
                        newVal = await newVal;
                        oldVal = await oldVal;

                        if (utils.getDataType(newVal) === "string") {
                            if (item.trim) {
                                newVal = newVal.trim();
                            }
                        }

                        item.value = newVal;
                        item.on.input({newVal, oldVal, source: item});
                        if (item.options.ruleTrigger.change) {
                            this.$set(item, "ruleResult", await this.checkValue(item));
                            this.ruleResult = item.ruleResult;
                            //监听ruleResult变化
                            await this.watchRuleResult(item, index);
                        }
                    }));
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
                } else {
                    //bug: 仅做更新ruleResult
                    this.$watch(async () => this.options.value, async () => {
                        setTimeout(() => {
                            this.ruleResult = this.options.ruleResult;
                        }, 30);
                    })
                }
                this.ruleResult = this.options.ruleResult;
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