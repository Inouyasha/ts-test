"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equal = exports.member = void 0;
const pair_1 = require("./pair");
/**
 * 判断给定字符串list是否包含item，包含返回包含item的块
 *
 * @param {string} item
 * @param {sList} x
 * @return {*}
 */
function member(item, x) {
    return (0, pair_1.isNull)(x)
        ? null
        : item === (0, pair_1.head)(x)
            ? x
            : member(item, (0, pair_1.tail)(x));
}
exports.member = member;
/**
 * 判断listA与listB是否相同
 *
 * @export
 * @template T
 * @param {List<T>} listA
 * @param {List<T>} listB
 * @return {*}
 */
function equal(listA, listB) {
    console.log(listA, listB);
    // 防止访问空节点的情况
    if ((0, pair_1.isNull)(listA) || (0, pair_1.isNull)(listB)) {
        return (0, pair_1.isNull)(listA) && (0, pair_1.isNull)(listB);
    }
    const listAHead = (0, pair_1.head)(listA);
    // 空节点对应空节点
    if ((0, pair_1.isNull)(listAHead)) {
        return (0, pair_1.isNull)((0, pair_1.head)(listB));
    }
    // 头节点不相同
    if ((0, pair_1.isPair)(listAHead) && !equal(listAHead, (0, pair_1.head)(listB))) {
        return false;
    }
    // 头节点为普通节点
    if (listAHead !== (0, pair_1.head)(listB)) {
        return false;
    }
    // 判断尾节点
    return equal((0, pair_1.tail)(listA), (0, pair_1.tail)(listB));
}
exports.equal = equal;
//# sourceMappingURL=symbolic-data.js.map