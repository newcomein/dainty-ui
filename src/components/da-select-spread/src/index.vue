<template>
    <div ref="da-select-spread" class="flex flex-center da-select-spread">
        <div class="flex flex-center line" v-for="(item,index) of init" @click="changeSelectStatus(index)">
            <div class="flex flex-inline left" ref="left" v-if="item.render&&item.render.left">
                <da-render-node :init="item.render.left"></da-render-node>
            </div>
            <div class="flex flex-inline center">
                <span v-if="item.title">{{item.title}}</span>
                <da-render-node v-if="item.render&&item.render.center" :init="item.render.center"></da-render-node>
            </div>
            <div class="flex flex-inline right">
                <div v-if="item.isShowSelectBox===undefined||item.isShowSelectBox"
                     class="flex flex-inline flex-center select-box"
                     :class="[{selected:selectedIds.includes(item.id)}]">
                    <da-icon class="da-icon" name="feather-check" size="4"
                             v-if="selectedIds.includes(item.id)"></da-icon>
                </div>
                <da-render-node v-if="item.render&&item.render.right" :init="item.render.right"></da-render-node>
            </div>
        </div>
    </div>
</template>

<script>
    import DaRenderNode from "../../da-render-node"

    export default {
        name: "da-select-spread",
        components: {DaRenderNode},
        data() {
            return {
                selectedIds: []
            }
        },
        props: {
            init: {
                type: Array,
                required: true
            },
            //单选
            isSingle: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        watch: {
            async selectedIds(newVal, oldVal) {
                if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                    this.$emit("update:selectedIds", this.selectedIds);
                }
            }
        },
        methods: {
            async changeSelectStatus(index) {
                const item = this.init[index];
                this.$set(item, "isSelect", !item.isSelect);
                this.addIds(item.id);
            },
            async addIds(curr_id) {
                //单选
                if (this.isSingle) {
                    this.selectedIds = [];
                    this.selectedIds.push(curr_id);
                } else {
                    this.checkIds();
                }

            },
            async checkIds() {
                let selectedIds = JSON.parse(JSON.stringify(this.selectedIds));
                for (const item of this.init) {
                    if (item.isSelect) {
                        selectedIds.push(item.id);
                    } else {
                        selectedIds = selectedIds.filter(value => value !== item.id);
                    }
                }
                this.selectedIds = [...new Set(selectedIds)];
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.checkIds();
            })
        }
    }
</script>