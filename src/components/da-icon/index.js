import "../../assets/style/index.less"
import index from "./src"

index.install = function (Vue) {
    Vue.component(index.name, index);
};

export default index;