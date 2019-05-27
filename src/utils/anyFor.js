import getDataType from "./getDataType"

//该循环函数无法被中断
export default async (data = [], fn) => {
    if (getDataType(data).match(/array|map/)) {
        const len = data.length;
        for (let i = 0; i < len; i++) {
            let item = data[i];
            fn(item, i);
        }
    } else {
        const keys = Object.keys(data);
        const len = keys.length;
        for (let i = 0; i < len; i++) {
            let item = data[keys[i]];
            fn(item, keys[i]);
        }
    }
}