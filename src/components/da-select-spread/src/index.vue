<template>
    <div ref="da-select-spread" class="da-flex da-flex-center da-select-spread">
        <div class="da-flex da-flex-center da-line" v-for="(item,index) of init" :key="index"
             @click="changeSelectStatus(index)">
            <div class="da-flex da-flex-inline da-left" ref="left" v-if="item.render&&item.render.left">
                <da-render-node :init="item.render.left"></da-render-node>
            </div>
            <div class="da-flex da-flex-inline da-left" ref="left" v-if="item.slots&&item.slots.left">
                <slot :name="item.slots.left"></slot>
            </div>
            <div class="da-flex da-flex-inline da-center">
                <slot></slot>
                <span v-if="item.title">{{item.title}}</span>
                <da-render-node v-if="item.render&&item.render.center" :init="item.render.center"></da-render-node>
                <slot v-if="item.slots&&item.slots.center" :name="item.slots.center"></slot>
            </div>
            <div class="da-flex da-flex-inline da-right">
                <!--TODO 欠缺一个初始化所有属性的utils  避免isShowSelectBox未定义的时候 不做undefined判断导致box状态显示错误-->
                <div v-if="item.isShowSelectBox===undefined||item.isShowSelectBox"
                     class="da-flex da-flex-inline da-flex-center da-select-box"
                     :class="[{'da-selected':selectedIdList.includes(item.id)}]">
                    <da-icon class="da-icon" name="feather-check" size="4"
                             v-if="selectedIdList.includes(item.id)"></da-icon>
                </div>
                <da-render-node v-if="item.render&&item.render.right" :init="item.render.right"></da-render-node>
                <slot v-if="item.slots&&item.slots.right" :name="item.slots.right"></slot>
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
                selectedIdList: []
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
            },
            //选择的id
            selectedIds: {
                type: Array,
                required: false,
                default: () => []
            }
        },
        watch: {
            async selectedIdList(newVal, oldVal) {
                if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                    this.$emit("update:selectedIds", this.selectedIdList);
                }
            },
            async init() {
                this.checkIds();
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
                    this.selectedIdList = [];
                    this.selectedIdList.push(curr_id);
                } else {
                    this.checkIds();
                }

            },
            async checkIds() {
                let selectedIdList = JSON.parse(JSON.stringify(this.selectedIdList));
                for (const item of this.init) {
                    if (item.isSelect) {
                        selectedIdList.push(item.id);
                    } else {
                        selectedIdList = selectedIdList.filter(value => value !== item.id);
                    }
                }
                this.selectedIdList = [...new Set(selectedIdList)];
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.checkIds();
            })
        }
    }
</script>
