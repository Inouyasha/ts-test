"use strict";
function throttle(fn, interval = 16) {
    // 每过interval ms 重新打开
    let open = true;
    // 典型的闭包用法 open会在执行结束前一直保持
    return (...args) => {
        if (!open) {
            return;
        }
        // 达到条件时返回原函数
        const ts = new Date().getTime() % interval;
        open = false;
        setTimeout(() => {
            open = true;
        }, interval - ts);
        fn(...args);
    };
}
function debounce(fn, interval = 16) {
    // 每过interval ms 重新打开
    let timer = null;
    // 典型的闭包用法 open会在执行结束前一直保持
    return (...args) => {
        if (timer !== null) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn(...args);
                clearTimeout(timer);
                timer = null;
            }, interval);
        }
    };
}
let counter = 0;
const onMouseMove = throttle(() => {
    console.log(counter);
});
const I = setInterval(() => {
    if (counter < 300) {
        counter++;
    }
    else {
        clearInterval(I);
    }
    onMouseMove();
}, 1);
//# sourceMappingURL=02-throttle.js.map