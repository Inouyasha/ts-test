"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pair_1 = require("./pair");
// Point
function makePoint(x, y) {
    return (0, pair_1.pair)(x, y);
}
function xPoint(p) {
    return (0, pair_1.head)(p);
}
function yPoint(p) {
    return (0, pair_1.tail)(p);
}
// Segment
function makeSegment(s, e) {
    return (0, pair_1.pair)(s, e);
}
function startSegment(segment) {
    return (0, pair_1.head)(segment);
}
function endSegment(segment) {
    return (0, pair_1.tail)(segment);
}
// 求线段中点
function midpointSegment(segment) {
    const s = startSegment(segment);
    const e = endSegment(segment);
    return makePoint((xPoint(s) + xPoint(e)) / 2, (yPoint(s) + yPoint(e)) / 2);
}
function makeRect(seg1, seg2) {
    // 判断线段是否垂直
    const vector1 = [
        xPoint(endSegment(seg1)) - xPoint(startSegment(seg1)),
        yPoint(endSegment(seg1)) - yPoint(startSegment(seg1)),
    ];
    const vector2 = [
        xPoint(endSegment(seg2)) - xPoint(startSegment(seg2)),
        yPoint(endSegment(seg2)) - yPoint(startSegment(seg2)),
    ];
    // 点乘
    const pointProduct = vector1[0] * vector2[0] + vector1[1] * vector2[1];
    // 线段不垂直 无法组成矩形
    if (pointProduct > Number.EPSILON) {
        throw new Error("Segments aren't vertical ");
    }
    return (0, pair_1.pair)(seg1, seg2);
}
function getSegmentLen(seg) {
    const s = startSegment(seg);
    const e = endSegment(seg);
    // 计算边长
    return Math.sqrt((xPoint(e) - xPoint(s)) ** 2 + (yPoint(e) - yPoint(s)) ** 2);
}
function width(rect) {
    return getSegmentLen((0, pair_1.head)(rect));
}
function height(rect) {
    return getSegmentLen((0, pair_1.tail)(rect));
}
function area(rect) {
    return width(rect) * height(rect);
}
function perimeter(rect) {
    return 2 * width(rect) + 2 * height(rect);
}
//# sourceMappingURL=exercise_2.2.js.map