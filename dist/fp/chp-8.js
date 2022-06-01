"use strict";
class Container {
    constructor(x) {
        this.$value = x;
    }
    static of(x) {
        return new Container(x);
    }
    map(f) {
        return Container.of(f(this.$value));
    }
}
console.log(Container.of(2).map((two) => two + 3));
//# sourceMappingURL=chp-8.js.map