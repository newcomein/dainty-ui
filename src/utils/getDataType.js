//判断数据类型
export default (data) => {
    let type = Object.prototype.toString.call(data);
    type = type.replace(/\[object |]/g, "").toLowerCase();
    return type
};