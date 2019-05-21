<template>
    <div class="flex da-icon" v-if="name">
        <svg>
            <use xlink:href="path/to/feather-sprite.svg#circle"/>
        </svg>
    </div>
</template>

<script>
    import "@/assets/style/common/index.less"
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
                    svg: ""
                }
            }
        },
        watch: {
            async name() {
                this.matchIcon();
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
                        console.log(this.iconMeta.svg)
                        break;
                }
            }
        },
        created() {
            this.matchIcon()
        }
    }
</script>

<style lang="less" scoped>

</style>