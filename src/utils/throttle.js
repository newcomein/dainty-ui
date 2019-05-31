//使用方法 先声明函数  再调用将函数赋值的变量
//例如 const throttle = utils.throttle(1000);  throttle(() => console.log(true));
const throttle = (delay = 200) => {
    let startTime = new Date();
    return async (fn) => {
        const curTime = new Date();
        if (curTime - startTime >= delay) {
            startTime = curTime;
            fn();
        }
    }
};

export default throttle