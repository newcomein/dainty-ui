<template>
    <div ref="da-radio" class="da-flex da-flex-inline da-radio" :class="[{'da-checked':options.checked}]"
         @click="options.checked=!options.checked">
        <div class="da-flex da-flex-inline da-input-box">
            <span v-if="options.isShowRadioIcon" class="da-flex da-flex-inline da-radio-icon"
                  :class="[{'da-isFirstTime':isFirstTime}]"></span>
            <da-render-node :init="options.render" v-if="options.render"></da-render-node>
        </div>
        <label class="da-flex da-flex-inline" v-if="options.label">
            <span>{{options.label}}</span>
        </label>
    </div>
</template>

<script>
    import DaRenderNode from "../../da-render-node"

    export default {
        name: "da-radio",
        components: {DaRenderNode},
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