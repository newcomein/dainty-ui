import "../../assets/style/index.less"
import index from "./src"

index.install = async function (Vue) {
    Vue.component(index.name, index);
    Vue.prototype.$daToast = async () => {
        const a = Vue.extend(index);
        const b = new a({
            el: document.createElement('div'),
        });
        console.log(b);
        document.body.appendChild(b.$el);
    };
};

export default index;