<template>
    <div class="da-flex da-flex-inline da-icon">
        <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="da-flex da-flex-inline da-icon-inline" v-if="render">
                <da-render-node :init="render"></da-render-node>
            </div>
            <div class="da-flex da-flex-inline da-icon-inline" v-else-if="name&&iconMeta.type==='svg'">
                <svg aria-hidden="true" v-if="iconMeta.svg.contents" v-html="iconMeta.svg.contents"
                     :style="[{strokeWidth:size}]"
                     :class="[name,iconMeta.class]"
                     :viewBox="iconMeta.svg.attrs.viewBox">
                </svg>
            </div>
        </transition>
    </div>
</template>

<script>
    import {icons} from "feather-icons"
    import DaRenderNode from "../../da-render-node"

    export default {
        name: "da-icon",
        components: {DaRenderNode},
        props: {
            name: {
                type: String
            },
            size: {
                type: String,
            },
            render: {
                type: Function,
                required: false
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
                    case "iconfont":
                        this.iconMeta.type = "svg";
                        this.iconMeta.svg = {
                            contents: `<use xlink:href="#${this.name}"></use>`,
                            attrs: {}
                        };
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