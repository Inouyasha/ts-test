import { head, Pair, pair, tail } from "./pair";

type Point = Pair<number>;
type Segment = Pair<Point>;

// Point
function makePoint(x: number, y: number): Point {
  return pair(x, y);
}
function xPoint(p: Point): number {
  return head(p);
}
function yPoint(p: Point): number {
  return tail(p);
}

// Segment
function makeSegment(s: Point, e: Point): Segment {
  return pair(s, e);
}
function startSegment(segment: Segment) {
  return head(segment);
}
function endSegment(segment: Segment) {
  return tail(segment);
}

// 求线段中点
function midpointSegment(segment: Segment) {
  const s = startSegment(segment);
  const e = endSegment(segment);

  return makePoint((xPoint(s) + xPoint(e)) / 2, (yPoint(s) + yPoint(e)) / 2);
}

// rectangle1
// 由给定的两条垂直线段组成
type Rect = Pair<Segment>;

function makeRect(seg1: Segment, seg2: Segment): Rect {
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

  return pair(seg1, seg2);
}
function getSegmentLen(seg: Segment) {
  const s = startSegment(seg);
  const e = endSegment(seg);
  // 计算边长
  return Math.sqrt((xPoint(e) - xPoint(s)) ** 2 + (yPoint(e) - yPoint(s)) ** 2);
}

function width(rect: Rect) {
  return getSegmentLen(head(rect));
}
function height(rect: Rect) {
  return getSegmentLen(tail(rect));
}

function area(rect: Rect) {
  return width(rect) * height(rect);
}
function perimeter(rect: Rect) {
  return 2 * width(rect) + 2 * height(rect);
}
