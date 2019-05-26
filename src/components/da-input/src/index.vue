<template>
    <div class="flex line" @click="item.on.click({position:'line',source:item})">
        <div class="flex line-box">
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
    </div>
</template>

<script>
    export default {
        name: "da-input"
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