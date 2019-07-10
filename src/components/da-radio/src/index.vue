<template>
    <div ref="da-radio" class="da-flex da-flex-inline da-radio">
        <div class="da-flex da-flex-inline input-box" @click="options.checked=!options.checked">
            <span class="da-flex da-flex-inline radio" :class="[{checked:options.checked},{isFirstTime}]"></span>
        </div>
        <label class="da-flex da-flex-inline" v-if="options.label">
            <span>{{options.label}}</span>
        </label>
    </div>
</template>

<script>

    export default {
        name: "da-radio",
        props: {
            options: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                isFirstTime: true
            }
        },
        mounted() {
            setTimeout(() => {
                //首次加载取消动画
                this.isFirstTime = false;
            }, 500);
        }
    }
</script>