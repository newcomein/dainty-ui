<template>
    <div ref="line" class="flex line" @click="options.on.click({position:'line',source:options})"
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
                                 @click="isDelete(options)" v-if="options.options.isShowDelete">
                        </da-icon>
                    </slot>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import "@/assets/style/common/index.less"
    import DaIcon from "../../da-icon/src"
    import utils from "@/utils"

    //实例注册存储
    let registerList = new Set();

    export default {
        name: "da-input",
        components: {DaIcon},
        props: {
            options: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                //初始化为不显示
                isReady: false,
                focusLineIndex: null,
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
            async start() {
                this.focusLineIndex = null;
                await utils.loopInputAllField([this.options]);
                this.options = await utils.initInputAttributes(this.options);
                //启动修正焦点模式
                if (this.options.fixAutofocus) {
                    this.getAutofocus();
                }
                this.isReady = true;
            },
        },
        created() {
            //储存当前注册的实例
            registerList.add(this);
            this.start();
        }
    }
</script>

<style lang="less" scoped>
    @border-bottom-color: #e7e7e7;
    @label-color: #666666;
    @placeholder-color: #999999;
    @da-icon-color: @label-color;
    .line {
        height: 0.56rem;
        padding: 0 0.12rem;
        background-color: white;
        position: relative;

        &:last-child {

            .line-box {
                border-bottom: 0;
            }
        }

        .line-box {
            border-bottom: 1px solid @border-bottom-color;
            height: 100%;

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
</style>