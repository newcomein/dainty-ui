<template>
    <div class="da-flex da-flex-inline da-icon" :style="[{color,fontSize}]" @click="$emit('click')">
        <transition mode="out-in" :enter-active-class="animationClass.enterActive"
                    :leave-active-class="animationClass.leaveActive">
            <div class="da-flex da-flex-inline da-icon-inline" v-if="render">
                <da-render-node :init="render"></da-render-node>
                <slot></slot>
            </div>
            <div class="da-flex da-flex-inline da-icon-inline" v-else-if="iconMeta.type==='svg'">
                <svg ref="icon" aria-hidden="true" v-if="iconMeta.svg.contents" v-html="iconMeta.svg.contents"
                     :style="[{strokeWidth},{width,height}]"
                     :class="[name,iconMeta.class]"
                     :id="[name]"
                     :viewBox="iconMeta.svg.attrs.viewBox">
                </svg>
                <slot></slot>
            </div>
            <div class="da-flex da-flex-inline da-icon-inline" v-else-if="iconMeta.type==='file'">
                <img @error="$emit('error')" @load="loadHandle" ref="icon"
                     :src="iconMeta.img.contents||iconMeta.svg.contents"
                     v-if="iconMeta.img.contents||iconMeta.svg.contents" :style="[{width,height}]"
                     :class="[name,iconMeta.class]">
                <slot></slot>
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
            file: {
                type: String
            },
            fileType: {
                type: String
            },
            strokeWidth: {
                type: String,
            },
            width: {
                type: String,
            },
            height: {
                type: String,
            },
            render: {
                type: Function,
                required: false
            },
            color: {
                type: String,
            },
            fontSize: {
                type: String,
            },
            animationClass: {
                type: Object,
                required: false,
                default: () => {
                    return {
                        enterActive: "animated fadeIn",
                        leaveActive: "animated fadeOut"
                    }
                }
            }
        },
        data() {
            return {
                iconMeta: {
                    type: "",
                    svg: {
                        contents: "",
                        attrs: {}
                    },
                    class: "",
                    img: ""
                },
                initialize: {
                    color: null
                }
            }
        },
        watch: {
            async name() {
                this.iconMeta = {
                    type: "",
                    svg: {
                        contents: "",
                        attrs: {}
                    },
                    class: "",
                    img: ""
                };
                this.matchIcon();
                if ((!this.name || this.name.length === 0) && (!this.file || this.file.length === 0)) {
                    this.$emit('error');
                }
            },
            async file() {
                this.iconMeta = {
                    type: "",
                    svg: {
                        contents: "",
                        attrs: {}
                    },
                    class: "",
                    img: ""
                };
                this.matchFile();
                if ((!this.name || this.name.length === 0) && (!this.file || this.file.length === 0)) {
                    this.$emit('error');
                }
            },
            async "iconMeta.svg"(val) {
                if (!val) {
                    this.iconMeta.svg = {};
                }
            },
            async color() {
                this.rebuildColor();
            }
        },
        methods: {
            async matchFile() {
                if (!this.file || this.file.length === 0 || this.name && this.file) {
                    return;
                }
                this.iconMeta.type = "file";
                this.iconMeta[this.fileType] = {
                    contents: this.file,
                    attrs: {}
                };
            },
            async matchIcon() {
                if (!this.name || this.name.length === 0 || this.name && this.file) {
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
                        setTimeout(async () => {
                            const svg = document.querySelector(`#${this.name}`);
                            if (!svg) {
                                return new Error(`该图标不存在:#${this.name}`);
                            }
                            this.iconMeta.type = "svg";
                            this.iconMeta.svg = {
                                contents: svg.innerHTML,
                                attrs: {viewBox: svg.attributes.viewBox.value}
                            };
                            this.$nextTick(async () => {
                                this.rebuildColor();
                            });
                        }, 10);
                        break;
                    default:
                        break;
                }
            },
            async rebuildColor(color = this.color || this.initialize.color) {
                const iconDom = this.$refs.icon;
                if (!iconDom || !color) {
                    return;
                }
                for (let i of iconDom.children) {
                    if (i.nodeName === "path") {
                        if (!this.initialize.color) {
                            this.initialize.color = i.attributes.fill.value;
                        }
                        i.setAttribute("fill", color);
                    }
                }
            },
            async loadHandle() {
                const iconDom = this.$refs.icon;
                this.$emit("load");
                if (iconDom.complete) {
                    this.$emit("complete");
                }
            }
        },
        mounted() {
            this.matchIcon();
            this.matchFile();
        },
    }
</script>
