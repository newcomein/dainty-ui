import config from '../../package.json'
import DaForm from "./da-form"
import DaIcon from "./da-icon"
import DaInput from "./da-input"

const components = {DaForm, DaIcon, DaInput};

const option = {};

const install = async function (Vue, option = {}) {
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
    DaForm, DaIcon, DaInput
}

export default data;