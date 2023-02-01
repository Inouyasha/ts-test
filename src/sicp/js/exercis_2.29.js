"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pair_1 = require("./pair");
function makMobile(left, right) {
    return (0, pair_1.list)(left, right);
}
function makeBranch(length, structure) {
    return (0, pair_1.list)(length, structure);
}
// 1
function leftBranch(m) {
    return (0, pair_1.head)(m);
}
function rightBranch(m) {
    return (0, pair_1.head)((0, pair_1.tail)(m));
}
function branchLength(b) {
    return (0, pair_1.head)(b);
}
function branchStructure(b) {
    return (0, pair_1.head)((0, pair_1.tail)(b));
}
function isMobileStructure(structure) {
    return (0, pair_1.isPair)(structure);
}
function totalWeight(m) {
    const lbs = branchStructure(leftBranch(m));
    const rbs = branchStructure(rightBranch(m));
    // 如果branch是mobile 就递归计算 如果是重量 直接输出
    return ((isMobileStructure(lbs) ? totalWeight(lbs) : lbs) +
        (isMobileStructure(rbs) ? totalWeight(rbs) : rbs));
}
function isBalanced(m) {
    const lb = leftBranch(m);
    const rb = rightBranch(m);
    const lbs = branchStructure(leftBranch(m));
    const rbs = branchStructure(rightBranch(m));
    // 左边内部是否平衡
    const leftFlag = isMobileStructure(lbs) ? isBalanced(lbs) : true;
    const rightFlag = isMobileStructure(rbs) ? isBalanced(rbs) : true;
    // 如果左右内部都平衡 判断外部是否平衡
    return (leftFlag &&
        rightFlag &&
        branchLength(lb) * totalWeight(lbs) ===
            branchLength(rb) * totalWeight(rbs));
}
//# sourceMappingURL=exercis_2.29.js.map