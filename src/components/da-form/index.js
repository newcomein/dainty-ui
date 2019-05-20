import index from "./src"

index.install = async function (Vue) {
    Vue.component(index.name, index)
};

export default index;