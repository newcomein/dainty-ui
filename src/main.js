import Vue from "vue"
import App from "./App.vue"
import daUi from "./components"

Vue.config.productionTip = false;

Vue.use(daUi);

new Vue({
    render: h => h(App),
}).$mount("#app");
