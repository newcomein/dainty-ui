import config from "../../package.json"
import DaForm from "./da-form"
import DaIcon from "./da-icon"
import DaInput from "./da-input"
import DaSelectSpread from "./da-select-spread"
import DaRenderNode from "./da-render-node"
import DaRadio from "./da-radio"
import DaRadioGroup from "./da-radio-group"
import DaDialog from "./da-dialog"
import DaToast from "./da-toast"

const components = {DaForm, DaIcon, DaInput, DaSelectSpread, DaRenderNode, DaRadio, DaRadioGroup, DaDialog, DaToast};

const option = {};

const install = async function (Vue, options = {}) {
    const keys = Object.keys(components);
    for (const i of keys) {
        const component = components[i];
        Vue.use(component);
    }
};

const data = {
    version: config.version,
    install,
    ...option,
    ...components
};

export {
    DaForm, DaIcon, DaInput, DaSelectSpread, DaRenderNode, DaRadio, DaRadioGroup, DaDialog, DaToast
}

export default data;