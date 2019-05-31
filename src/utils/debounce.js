//使用方法 先声明函数  再调用将函数赋值的变量
//例如 const debounce = utils.debounce(1000);  debounce(() => console.log(true));
const debounce = (delay = 200) => {
    let timeout = 0;
    return async (fn) => {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, delay);
    }
};

export default debounce