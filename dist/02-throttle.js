"use strict";
function throttle(fn, interval) {
    if (interval === void 0) { interval = 16; }
    // 每过interval ms 重新打开
    var open = true;
    // 典型的闭包用法 open会在执行结束前一直保持
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!open) {
            return;
        }
        // 达到条件时返回原函数
        var ts = new Date().getTime() % interval;
        open = false;
        setTimeout(function () {
            open = true;
        }, interval - ts);
        fn.apply(void 0, args);
    };
}
function debounce(fn, interval) {
    if (interval === void 0) { interval = 16; }
    // 每过interval ms 重新打开
    var timer = null;
    // 典型的闭包用法 open会在执行结束前一直保持
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timer !== null) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(void 0, args);
                clearTimeout(timer);
                timer = null;
            }, interval);
        }
    };
}
var counter = 0;
var onMouseMove = throttle(function () {
    console.log(counter);
});
var I = setInterval(function () {
    if (counter < 300) {
        counter++;
    }
    else {
        clearInterval(I);
    }
    onMouseMove();
}, 1);
//# sourceMappingURL=02-throttle.js.map