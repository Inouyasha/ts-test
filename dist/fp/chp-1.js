"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function curry(func) {
    const g = (...ags) => {
        if (ags.length >= func.length) {
            return func(...ags);
        }
        return (...left) => {
            return g(...ags, ...left);
        };
    };
    return g;
}
function compose(...funcs) {
    // 右reduce 就是compose的行为
    return (...args) => {
        return funcs.reduceRight((acc, curr) => {
            // 调用当前的func
            return [curr.apply(null, acc)];
        }, args)[0];
    };
}
//# sourceMappingURL=chp-1.js.map