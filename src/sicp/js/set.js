"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unionSet = exports.intersectionSet = exports.isElementOfSet = exports.adjoinSet = void 0;
const pair_1 = require("./pair");
/**
 * set中加入元素x
 *
 * @export
 * @template T
 * @param {T} x
 * @param {set<T>} set
 * @return {*}
 */
function adjoinSet(x, set) {
    return isElementOfSet(x, set) ? set : (0, pair_1.pair)(x, set);
}
exports.adjoinSet = adjoinSet;
/**
 * 判断集合元素的x，y是否相同
 *
 * @param {*} x
 * @param {*} y
 * @return {*}
 */
function equal(x, y) {
    return x === y;
}
/**
 * 集合set中是否存在元素x
 *
 * @export
 * @template T
 * @param {T} x
 * @param {set<T>} set
 * @return {*}
 */
function isElementOfSet(x, set) {
    return (0, pair_1.isNull)(set)
        ? false
        : equal(x, (0, pair_1.head)(set))
            ? true
            : isElementOfSet(x, (0, pair_1.tail)(set));
}
exports.isElementOfSet = isElementOfSet;
/**
 * 返回集合的交集
 *
 * @export
 * @template T
 * @param {set<T>} set1
 * @param {set<T>} set2
 * @return {*}
 */
function intersectionSet(set1, set2) {
    return (0, pair_1.filter)(set1, (ele) => {
        return isElementOfSet(ele, set2);
    });
}
exports.intersectionSet = intersectionSet;
/**
 * 求并集
 *
 * @export
 * @template T
 * @param {set<T>} set1
 * @param {set<T>} set2
 * @return {*}
 */
function unionSet(set1, set2) {
    // 找到set1中和set2不交的部分
    const notDuplicateSet = (0, pair_1.filter)(set1, (ele) => {
        return !isElementOfSet(ele, set2);
    });
    // 合并两部分
    return (0, pair_1.append)(notDuplicateSet, set2);
}
exports.unionSet = unionSet;
//# sourceMappingURL=set.js.map