<template>
    <div class="flex line" @click="options.on.click({position:'line',source:options})"
         v-if="isReady&&options.type==='input'">
        <div class="flex line-box">
            <label class="flex flex-inline">
                <span>{{options.label}}</span>
            </label>
            <div class="flex flex-inline input-box">
                <input v-model="options.value" type="text" @focus="focus(options.field)" @blur="blur(options.field)"
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
            async start() {
                this.options = await utils.initInputAttributes(this.options);
                this.isReady = true;
            },
        },
        created() {
            this.start()
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