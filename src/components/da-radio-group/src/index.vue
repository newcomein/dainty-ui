<template>
    <div ref="da-radio" class="da-flex da-flex-inline da-radio">
        <template v-for="(item,index) of init">
            <da-radio :options="item" :key="index"></da-radio>
        </template>
    </div>
</template>

<script>
    import DaRadio from "../../da-radio"

    export default {
        name: "da-radio-group",
        components: {DaRadio},
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
            async init() {
                this.watchItems();
            }
        },
        methods: {
            async watchItems() {
                for (let i of this.init) {
                    if (!i._isWatchValue) {
                        i._isWatchValue = true;
                        this.$watch(() => i.checked, async (newVal, oldVal) => {
                            if (this.isSingle && newVal) {
                                this.init.map(value => {
                                    if (i.field !== value.field) {
                                        value.checked = false;
                                    }
                                })
                            }
                        })
                    }
                }
            }
        },
        created() {
            this.watchItems();
        }
    }
</script>