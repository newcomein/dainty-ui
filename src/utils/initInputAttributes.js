import anyFor from "./anyFor"

export default async (item) => {
    const itemKeys = [];
    anyFor(item, async (item, i) => itemKeys.push(i));

    if (itemKeys.indexOf("type") <= -1) {
        item.type = "text"
    }
    if (itemKeys.indexOf("autofocus") <= -1) {
        item.autofocus = true
    }
    if (itemKeys.indexOf("disabled") <= -1) {
        item.disabled = false
    }
    //修正autofocus规则  w3c官方规则 只有输入字符的时候placeholder才会消失  启动修正模式  输入框获得聚焦即可让placeholder消失
    if (itemKeys.indexOf("fixAutofocus") <= -1) {
        item.fixAutofocus = true
    }
    if (itemKeys.indexOf("placeholder") <= -1) {
        item.placeholder = "";
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


    //change: 改变value时校验正则 blur:失去焦点 focus:获得焦点
    const ruleTrigger = {
        blur: true,
        focus: false,
        change: true
    };

    if (item.options.ruleTrigger) {
        Object.assign(ruleTrigger, item.options.ruleTrigger);
        delete item.options.ruleTrigger;
    }


    //选项
    item.options = Object.assign({
        isShowDelete: true,
        captchaCallBack: async () => true,//验证码发送回调
        ruleTrigger
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