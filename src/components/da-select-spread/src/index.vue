<template>
    <div ref="da-select-spread" class="flex flex-center da-select-spread">
        <div class="flex flex-center line" v-for="(item,index) of init">
            <div class="flex flex-inline left" ref="left" v-if="item.render.left">
                <da-render-node></da-render-node>
            </div>
            <div class="flex flex-inline center">
                <span>银联扫码</span>
            </div>
            <div class="flex flex-inline right" @click="changeSelectStatus(index)">
                <div class="flex flex-inline flex-center select-box" :class="[{selected:item.isSelect}]">
                    <da-icon class="da-icon" name="feather-check" size="4" v-show="item.isSelect"></da-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DaRenderNode from "../../da-render-node"

    export default {
        name: "da-select-spread",
        components: {DaRenderNode},
        props: {
            init: {
                type: Array,
                required: true
            }
        },
        methods: {
            async changeSelectStatus(index) {
                const item = this.init[index];
                this.$set(item, "isSelect", !item.isSelect);
            }
        },
        created() {

        }
    }
</script>