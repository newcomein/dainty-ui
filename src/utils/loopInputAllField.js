import anyFor from "./anyFor"

export default async (list = []) => {
    const fields = {};
    anyFor(list, async (item, i) => {

        if (!Object.keys(item).includes("field") || !Object.keys(item).includes("value"), !Object.keys(item).includes("type")) {
            throw {
                message: "type,field,value不能为空",
                data: item
            };
        }

        if (!fields[item.field]) {
            fields[item.field] = 0;
        }

        fields[item.field]++;
        if (fields[item.field] > 1) {
            throw {
                message: `${item.field}不能重复`,
                data: item
            };
        }

    })
}