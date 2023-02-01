"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Church numerals
const zero = (f) => (x) => x;
// church数到普通数字
function churchToNumber(cNum) {
    return cNum((x) => x + 1)(0);
}
function add_1(n) {
    return (f) => (x) => f(n(f)(x));
}
// 整数对应了函数f对参数x的迭代次数 要求的f是同类的
const one = (f) => (x) => f(x);
const two = (f) => (x) => f(f(x));
function add(n1, n2) {
    return (f) => (x) => n2(f)(n1(f)(x));
}
//# sourceMappingURL=church_number.js.map