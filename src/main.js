import Vue from "vue"
import App from "./App.vue"
import daUi from "./components"

Vue.config.productionTip = false;

Vue.use(daUi);

// const loadAllSvg = () => {
//     const requireAll = requireContext => requireContext.keys().map(requireContext)
//     const req = require.context('@/assets/svgIcons', true, /\.svg$/)
//     requireAll(req)
// }
//
// loadAllSvg()

new Vue({
    render: h => h(App),
}).$mount("#app");
