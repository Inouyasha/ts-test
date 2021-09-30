"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Y-Combination
function curry2(f) {
    var g = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length >= f.length) {
            return f.apply(void 0, args);
        }
        return function () {
            var left = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                left[_i] = arguments[_i];
            }
            return g.apply(void 0, __spreadArray(__spreadArray([], args, false), left, false));
        };
    };
    return g;
}
function _add(a, b, c, d) {
    return a + b + c + d;
}
var add = curry2(_add);
console.log(add(1, 2, 3, 4));
console.log(add(1, 2)(3)(4));
console.log(add(1, 2)(3, 4));
//# sourceMappingURL=03-curry.js.map