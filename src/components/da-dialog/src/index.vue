<template>
    <div class="da-flex da-flex-center da-dialog">
        <transition mode="in-out" enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut">
            <div class="da-flex da-shadow-background" v-if="isShow"></div>
        </transition>
        <transition mode="in-out" enter-active-class="animated fadeIn"
                    leave-active-class="animated faster fadeOut">
            <div v-if="isShow" class="da-flex da-flex-center da-dialog-box" @touchmove.prevent="" @mousewheel.prevent=""
                 @click="closeOnClickModalHandle">
                <div class="da-flex da-flex-center da-outsideBox">
                    <div class="da-flex da-flex-center da-flex-column da-block">
                        <div class="da-flex da-content" @click.stop="" @touchmove.stop="" @mousewheel.stop="">
                            <div class="da-flex da-top">
                                <slot name="top" v-if="$slots.top"></slot>
                            </div>
                            <slot></slot>
                        </div>
                        <div class="da-flex da-flex-center da-flex-column da-bottom">
                            <slot name="bottom" v-if="$slots.bottom"></slot>
                            <da-icon name="feather-x-circle" v-else></da-icon>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "da-dialog",
        props: {
            isShow: {
                type: Boolean,
                default: false,
            },
            //是否可以通过点击 modal 关闭 Dialog
            closeOnClickModal: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            async closeOnClickModalHandle() {
                if (this.closeOnClickModal) {
                    this.$emit('update:isShow', !this.isShow)
                }
            }
        }
    }
</script>
