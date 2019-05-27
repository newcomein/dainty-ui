<template>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div class="flex flex-inline da-icon" v-if="name&&iconMeta.type" @click.stop="$emit('click')">
            <svg v-if="iconMeta.svg.contents" v-html="iconMeta.svg.contents" :class="[name,iconMeta.class]"
                 :viewBox="iconMeta.svg.attrs.viewBox">
            </svg>
        </div>
    </transition>
</template>

<script>
    import {icons} from "feather-icons"

    export default {
        name: "da-icon",
        props: {
            name: {
                type: String
            }
        },
        data() {
            return {
                iconMeta: {
                    type: "",
                    svg: "",
                    class: ""
                }
            }
        },
        watch: {
            async name() {
                this.matchIcon();
            },
            async "iconMeta.svg"(val) {
                if (!val) {
                    this.iconMeta.svg = {};
                }
            }
        },
        methods: {
            async matchIcon() {

                if (!this.name || this.name.length === 0) {
                    return;
                }

                const iconType = this.name.slice(0, this.name.indexOf("-"));
                const iconName = this.name.replace(iconType + "-", "");

                switch (iconType) {
                    case "feather":
                        this.iconMeta.type = "svg";
                        this.iconMeta.svg = icons[iconName];
                        break;
                    default:
                        break;
                }

            }
        },
        mounted() {
            this.matchIcon()
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../assets/style/common/index.less";
    @import "../../../assets/style/animations/index.less";

    .da-icon {
        position: relative;
        justify-content: center;

        svg {
            width: 1em;
            height: 1em;
            overflow: hidden;
        }

        [class*=feather-] {
            stroke: currentColor;
            stroke-width: 1;
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
        }
    }
</style>