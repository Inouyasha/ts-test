"use strict";
// Y-Combination
function curry2(f) {
    const g = (...args) => {
        if (args.length >= f.length) {
            return f(...args);
        }
        return (...left) => {
            return g(...args, ...left);
        };
    };
    return g;
}
function _add(a, b, c, d) {
    return a + b + c + d;
}
const add = curry2(_add);
console.log(add(1, 2, 3, 4));
console.log(add(1, 2)(3)(4));
console.log(add(1, 2)(3, 4));
//# sourceMappingURL=03-curry.js.map