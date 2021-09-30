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
Object.defineProperty(exports, "__esModule", { value: true });
function curry(func) {
    var g = function () {
        var ags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ags[_i] = arguments[_i];
        }
        if (ags.length >= func.length) {
            return func.apply(void 0, ags);
        }
        return function () {
            var left = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                left[_i] = arguments[_i];
            }
            return g.apply(void 0, __spreadArray(__spreadArray([], ags, false), left, false));
        };
    };
    return g;
}
function compose() {
    var funcs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        funcs[_i] = arguments[_i];
    }
    // 右reduce 就是compose的行为
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return funcs.reduceRight(function (acc, curr) {
            // 调用当前的func
            return [curr.apply(null, acc)];
        }, args)[0];
    };
}
//# sourceMappingURL=chp-1.js.map