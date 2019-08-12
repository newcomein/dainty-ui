import "../../assets/style/index.less"
import index from "./src"

index.install = async function (Vue) {
    Vue.component(index.name, index);
    Vue.prototype.$daToast = async ({message = "", type = "info", render = null, timeOutClose = 3000}) => {
        const toastComponent = Vue.extend(index);
        const toastComponentDOM = new toastComponent({
            el: document.createElement("div"),
            data: {message, type, render, timeOutClose}
        });
        document.body.appendChild(toastComponentDOM.$el);
    };
};

export default index;