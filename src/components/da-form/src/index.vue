<template>
    <div class="flex da-form">
        <form class="flex">
            <div class="flex line" v-for="(item,index) of initForm" :key="index" v-if="item.type==='input'">
                <label class="flex flex-inline">
                    <span>{{item.label}}</span>
                </label>
                <div class="flex flex-inline input-box">
                    <input v-model="item.value">
                    <da-icon class="da-icon" :name="icons.delete"></da-icon>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import "@/assets/style/common/index.less"
    import DaIcon from "../../da-icon/src/index";

    export default {
        name: "da-form",
        components: {DaIcon},
        props: {
            init: {
                type: Array,
                required: true
            }
        },
        watch: {
            async init(val) {
                this.initForm = val;
            },
            async initForm(val) {
                for (const i of val) {
                    console.log(i)
                }
            }
        },
        data() {
            return {
                initForm: [],
                icons: {
                    delete: "feather-x"
                },
            }
        },
        created() {
            this.initForm = this.init;
        }
    }
</script>

<style lang="less" scoped>
    .da-form {
        form {
            .line {
                height: 0.6rem;
                padding: 0 0.12rem;
                background-color: white;

                label, .input-box {
                    height: 100%;
                }

                label {
                    flex: 0.6219;
                }

                .input-box {
                    flex: auto;

                    input {
                        flex: auto;
                    }

                    .da-icon {
                        flex: 0.25;
                        justify-content: flex-end;
                        font-size: 0.25rem;
                        transition: all 0.5s;
                        &:active{
                            transform: scale(2);
                        }
                    }
                }
            }
        }
    }
</style>