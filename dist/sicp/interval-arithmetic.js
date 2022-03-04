"use strict";
// 用于计算电阻之间的运算
// 给定电阻的大体值和精度值可以得到其电阻区间 目标是在算法屏障下给出这种区间的运算算法
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interval = void 0;
// 关于数据结构
class Interval {
    constructor(val, tolerance = 0) {
        if (tolerance < 0) {
            throw Error("Must be non-negative");
        }
        console.log(val, tolerance);
        this.val = val;
        this.tolerance = tolerance;
    }
    // 创建interval
    static makeInterval(lowerBound, upperBound) {
        const val = (lowerBound + upperBound) / 2;
        if (val === 0) {
            return new Interval(0);
        }
        const tolerance = (upperBound - val) / val;
        return new Interval(val, tolerance);
    }
    static addInterval(x, y) {
        return this.makeInterval(x.lowerBound() + y.lowerBound(), x.upperBound() + y.upperBound());
    }
    static subInterval(x, y) {
        return this.makeInterval(x.lowerBound() - y.upperBound(), x.upperBound() - y.lowerBound());
    }
    static mulInterval(x, y) {
        const p1 = x.lowerBound() * y.lowerBound();
        const p2 = x.lowerBound() * y.upperBound();
        const p3 = x.upperBound() * y.lowerBound();
        const p4 = x.upperBound() * y.upperBound();
        return this.makeInterval(Math.min(p1, p2, p3, p4), Math.max(p1, p2, p3, p4));
    }
    static divInterval(x, y) {
        // 2.10
        if (y.upperBound() === 0 || y.lowerBound() === 0) {
            throw new Error("division error (interval spans 0)");
        }
        return this.mulInterval(x, this.makeInterval(1 / y.upperBound(), 1 / y.lowerBound()));
    }
    // 最下层运算 获取上下界 根据上下界生成新的区间
    lowerBound() {
        return this.val > 0
            ? this.val * (1 - this.tolerance)
            : this.val * (1 + this.tolerance);
    }
    upperBound() {
        return this.val > 0
            ? this.val * (1 + this.tolerance)
            : this.val * (1 - this.tolerance);
    }
    // 2.11 利用中心位置 和 误差宽度进行构建 如 3.5±0.15
    static makeCenterWidth(center, width) {
        return Interval.makeInterval(center - width, center + width);
    }
    center() {
        return (this.lowerBound() + this.upperBound()) / 2;
    }
    width() {
        return (this.upperBound() - this.lowerBound()) / 2;
    }
    // 2.12 中心位置和误差比例 如 6.0 10 => [5.4,6.6]
    static makeCenterPercent(center, percent) {
        const width = center * (percent / 100);
        return Interval.makeCenterWidth(center, width);
    }
    percent() {
        return (this.width() / this.center()) * 100;
    }
}
exports.Interval = Interval;
//# sourceMappingURL=interval-arithmetic.js.map