<template>
    <div class="da-flex da-flex-inline da-icon">
        <transition mode="out-in" :enter-active-class="animationClass.enterActive"
                    :leave-active-class="animationClass.leaveActive">
            <div class="da-flex da-flex-inline da-icon-inline" v-if="render">
                <da-render-node :init="render"></da-render-node>
            </div>
            <div class="da-flex da-flex-inline da-icon-inline" v-else-if="iconMeta.type==='svg'">
                <svg aria-hidden="true" v-if="iconMeta.svg.contents" v-html="iconMeta.svg.contents"
                     :style="[{strokeWidth:size}]"
                     :class="[name,iconMeta.class]"
                     :viewBox="iconMeta.svg.attrs.viewBox">
                </svg>
            </div>
            <div class="da-flex da-flex-inline da-icon-inline" v-else-if="iconMeta.type==='file'">
                <img :src="iconMeta.img.contents||iconMeta.svg.contents"
                     v-if="iconMeta.img.contents||iconMeta.svg.contents" :style="[{width,height}]"
                     :class="[name,iconMeta.class]">
            </div>
        </transition>
    </div>
</template>

<script>
    import {icons} from "feather-icons"
    import DaRenderNode from "../../da-render-node"

    const iconMetaValue = {
        type: "",
        svg: "",
        class: "",
        img: ""
    };

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
            size: {
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
                iconMeta: iconMetaValue,
            }
        },
        watch: {
            async name() {
                this.iconMeta = iconMetaValue;
                this.matchIcon();
            },
            async file() {
                this.iconMeta = iconMetaValue;
                this.matchFile();
            },
            async "iconMeta.svg"(val) {
                if (!val) {
                    this.iconMeta.svg = {};
                }
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
            this.matchIcon();
            this.matchFile();
        },
    }
</script>