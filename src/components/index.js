import config from '../../package.json'
import DaForm from "./da-form"
import DaIcon from "./da-icon"

const components = {DaForm, DaIcon};

const option = {};

const install = function (Vue, option = {}) {
    const keys = Object.keys(components);
    for (const i of keys) {
        const component = components[i];
        Vue.use(component);
    }
};

export default {
    version: config.version,
    install,
    ...option,
    ...components
}