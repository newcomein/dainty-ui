export default async (url = "") => {
    let data = "";
    try {
        data = require(url);
    } catch (e) {
        console.error(url);
        throw "没有找到文件"
    }
    return data
}