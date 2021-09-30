"use strict";
// 输入一个字符串，输出字符串的全排列
// 基础思路 交换字符后递归
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function permutation(str) {
    // 输入为字符数组['a', 'b', 'c']
    function R(strArr) {
        //   只有一个字符直接输出
        if (strArr.length === 1) {
            return __spreadArray([], strArr, true);
        }
        var charSet = new Set();
        // 这里可以用reduce实现 但是感觉更难看懂
        var retArr = [];
        var _loop_1 = function (i) {
            var char = strArr[i];
            // 避免重复排列 重复排列跳过
            if (charSet.has(char)) {
                return "continue";
            }
            charSet.add(char);
            // 输出
            retArr = __spreadArray(__spreadArray([], retArr, true), R(strArr.filter(function (c, index) { return index !== i; })).map(function (str) {
                return char + str;
            }), true);
        };
        for (var i = 0; i !== strArr.length; i++) {
            _loop_1(i);
        }
        return retArr;
    }
    return R(__spreadArray([], str, true));
}
console.log(permutation("aaaa"));
//# sourceMappingURL=01-permutation.js.map