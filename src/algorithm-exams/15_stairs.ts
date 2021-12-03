// 走楼梯问题 最后两人有多少种方法停在同一级
function stairMeetCount1(n: number) {
  // 特殊情况 1阶的时候没有办法在一起 0阶的时候一开始就在一起
  if (n < 0 || n === 1) {
    return 0;
  }
  if (n === 0) {
    return 1;
  }

  return (
    stairMeetCount1(n - 2) +
    2 * stairMeetCount1(n - 3) +
    3 * stairMeetCount1(n - 4) +
    2 * stairMeetCount1(n - 5) +
    stairMeetCount1(n - 6)
  );
}
console.log(stairMeetCount1(10));

// 其实如果带状态转移本质上也是动态规划
const N = 10;
const STEPS = 3;
function stairMeetCount(a: number, b: number) {
  if (a > b) return 0;
  if (a === b) return 1;

  let count = 0;
  for (let i = 1; i <= STEPS; i++) {
    for (let j = 1; j <= STEPS; j++) {
      count += stairMeetCount(a + i, b - j);
    }
  }
  return count;
}
console.log(stairMeetCount(0, N));



