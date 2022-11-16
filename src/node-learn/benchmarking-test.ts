// 统计的func时长
const func = () => {
  let sum = 0;
  for (let i = 0; i < 100; i++) {
    sum += i;
  }
};

// 传统模式1 new Date时间统计
let totalTime1: number;
const start1 = new Date();
const rounds = 100000;
let index = rounds;
while (index--) {
  // Code snippet goes here
  func();
}
totalTime1 = new Date().getTime() - start1.getTime();
console.log({ time: totalTime1 / rounds });
// 问题 基本上结果都是0ms

// 计算固定时长内可以跑多少轮 反推一轮的时间 此处时长为1s
// convert ms to seconds totalTime /= 1000;
// period is how long per operation period = totalTime / runs;
// hz is the number of operations per second hz = 1 / period;
// can be shortened to // hz = (runs * 1000) / totalTime;
let hz,
  period,
  startTime = new Date(),
  totalTime2 = 0, // ms单位
  runs = 0;
do {
  // Code snippet goes here
  func();
  for (let a = 0; a < 100; a++) {}
  runs++;
  totalTime2 = new Date().getTime() - startTime.getTime();
} while (totalTime2 < 1000);
console.log({ time2: totalTime2 / runs });
// 问题 每一轮执行后，都会垃圾回收，受v8引擎垃圾回收的影响 真实速度会跟快一些

// ...would compile to â†’ var hz, startTime = new Date; x == y; x == y; x == y; x == y; x == y;
// ... hz = (runs * 1000) / (new Date - startTime);
index = rounds;
function test() {
  x == y;
}
while (index--) {
  test();
}
// 上面的循环在编译时会优化为一系列的func的执行 从而减少垃圾回收的次数 但是会让代码变多 https://en.wikipedia.org/wiki/Loop_unrolling


// Benchmark 除了对声明不重复 只让循环体的内容重复 减少不必要的回收占用时间
// var x = 1,
//   y = "1";
// function test() {
//   x == y;
// }
// while (iterations--) {
//   test();
// } // ...would compile to â†’ var x = 1, y = "1"; while (iterations--) { x == y; }

