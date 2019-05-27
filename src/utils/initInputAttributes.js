import anyFor from "./anyFor"

export default async (item) => {
    const itemKeys = [];
    anyFor(item, async (item, i) => itemKeys.push(i));


    if (itemKeys.indexOf("autofocus") <= -1) {
        item.autofocus = true
    }
    //修正autofocus规则  w3c官方规则 只有输入字符的时候placeholder才会消失  启动修正模式  输入框获得聚焦即可让placeholder消失
    if (itemKeys.indexOf("fixAutofocus") <= -1) {
        item.fixAutofocus = true
    }
    if (itemKeys.indexOf("readonly") <= -1) {
        item.readonly = false
    }
    if (itemKeys.indexOf("trim") <= -1) {
        item.trim = true
    }
    if (itemKeys.indexOf("rules") <= -1) {
        item.rules = [];
    }
    if (itemKeys.indexOf("slots") <= -1) {
        item.slots = [];
    }
    //位置插槽
    if (itemKeys.indexOf("positionSlots") <= -1) {
        item.positionSlots = {};
    }
    if (itemKeys.indexOf("options") <= -1) {
        item.options = {};
    }
    //不可修改  仅做内部数据处理
    if (itemKeys.indexOf("_calls") <= -1) {
        item._calls = {};
    }

    //正则判断结果  父组件修改无效
    item.ruleResult = {isPass: false, message: ""};


    //选项
    item.options = Object.assign({
        isShowDelete: true
    }, item.options);


    //事件
    if (itemKeys.indexOf("on") <= -1) {
        item.on = {};
    }

    item.on = Object.assign({
        async input({newVal, oldVal, source}) {
            return true
        },
        async click({position, source}) {
            return true
        }
    }, item.on);

    return item
}