<template>
    <div class="da-flex da-flex-center da-dialog">
        <transition mode="in-out" enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut">
            <div class="da-flex da-shadow-background" v-if="isShow"></div>
        </transition>
        <transition mode="in-out" enter-active-class="animated faster fadeIn flipInY" leave-active-class="animated faster fadeOut flipOutY">
            <div v-if="isShow" class="da-flex da-flex-center da-dialog-box" @touchmove.prevent="" @mousewheel.prevent=""
                 @click="$emit('update:isShow',!isShow)">
                <div class="da-flex da-flex-center da-outsideBox">
                    <div class="da-flex da-flex-center da-flex-column da-block">
                        <div class="da-flex da-insideBox" @click.stop="">

                        </div>
                        <div class="da-flex da-flex-inline da-flex-center da-flex-column da-close">
                            <da-icon name="feather-x-circle"></da-icon>
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
            }
        },
        methods: {}
    }
</script>