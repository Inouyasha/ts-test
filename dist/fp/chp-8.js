"use strict";
var Container = /** @class */ (function () {
    function Container(x) {
        this.$value = x;
    }
    Container.of = function (x) {
        return new Container(x);
    };
    Container.prototype.map = function (f) {
        return Container.of(f(this.$value));
    };
    return Container;
}());
console.log(Container.of(2).map(function (two) { return two + 3; }));
//# sourceMappingURL=chp-8.js.map