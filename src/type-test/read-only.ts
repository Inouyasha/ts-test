type Point = {
  readonly x: number;
  y: number;
};
const point: Point = {
  x: 0,
  y: 0,
};
// 设置了readonly编译不通过 但是只是语义上不通过 生成的js代码并不是readonly的
// point = { x: 1, y: 1 };
// point.x = 1;
// point.y = 1;
