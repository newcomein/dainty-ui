<template>
    <transition mode="in-out" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div v-if="isShow" class="da-flex da-flex-inline da-toast">
            <div class="da-flex da-flex-center da-box">
                <div class="da-flex da-flex-inline da-insideBox">
                    <div class="da-flex da-flex-inline da-content">
                        <span>{{message}}</span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "da-toast",
        data() {
            return {
                message: "",
                type: "",
                render: "",
                isShow: false,
                timeOutClose: 3000
            }
        },
        methods: {
            async close() {
                this.isShow = false;
                this.$nextTick(() => this.$destroy());
            },
            async timer() {
                setTimeout(this.close, this.timeOutClose);
            }
        },
        mounted() {
            this.isShow = true;
            this.timer();
        }
    }
</script>