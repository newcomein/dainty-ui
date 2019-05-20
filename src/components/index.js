import config from '../../package.json'
import DAForm from "./da-form"

const components = {DAForm};

const option = {};

const install = async function (Vue, option = {}) {
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