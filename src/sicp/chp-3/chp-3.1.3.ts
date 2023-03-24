// SICP JS 3.1.2

// A very simple rand_update function computes a number
// from 0 (inclusive) to 200560490131 (a large prime)
// from a value x by multiplying it with a constant a,
// adding a constant b, and then taking the remainder
// of dividing it by the large prime. We used it here
// for illustration only, and do not claim any
// statistical properties.
/**
 * 随机数发生器 根据上一个数生成下一个随机数
 * 其核心思想在于要求生成一个不重复且可以遍历Int集合的一个序列
 *
 * @param {number} x
 * @return {*}
 */
function rand_update(x: number) {
  const m = 200560490131;
  const a = 1103515245;
  const b = 12345;

  return (a * x + b) % m;
}
/**
 * 生成一个随机数发生器
 *
 * @param {number} [random_init=123456789]
 * @return {*}
 */
function make_rand(random_init = 123456789) {
  let x = random_init;
  return () => {
    x = rand_update(x);
    return x;
  };
}
const rand = make_rand();

/**
 * result = 6 / pi^2 利用该公式结果反推pi值
 *
 * @param {*} trials 轮数
 * @return {*}
 */
function estimate_pi(trials: number) {
  return Math.sqrt(6 / monte_carlo(trials, dirichlet_test));
}

function gcd(a: number, b: number) {
  return b === 0 ? a : gcd(b, a % b);
}
function dirichlet_test() {
  return gcd(rand(), rand()) === 1;
}

/**
 * 随机抽取两个数 互素的概率为 pi^2/6
 * 利用蒙特卡洛算法 根据结果反求pi
 *
 * 实现1 基于有状态的rand算法
 *
 * @param {number} trials
 * @param {() => boolean} experiment
 * @return {*}
 */
function monte_carlo(trials: number, experiment: () => boolean) {
  let success_count = 0;
  for (let i = 0; i !== trials; i++) {
    if (experiment()) {
      success_count++;
    }
  }
  return success_count / trials;
  // 原先实现方式 递归栈太长
  // function iter(trials_remaining: number, trials_passed: number) {
  //   return trials_remaining === 0
  //     ? trials_passed / trials
  //     : experiment()
  //     ? iter(trials_remaining - 1, trials_passed + 1)
  //     : iter(trials_remaining - 1, trials_passed);
  // }
  // return iter(trials, 0);
}

// estimate_pi(10000);

/**
 * 实现2
 * 该实现直接计算random数 但是无法实现封装 直接表现蒙特卡洛算法 得到的函数是蒙特卡洛和随机数验证行为的耦合
 * 即就是说 上面的方法可以做到将蒙特卡洛和蒙特卡洛的测试方法组合得到的新函数 而这个 做不到
 *
 * @param {number} trials
 * @param {number} initial_x
 * @return {*}
 */
function random_gcd_test2(trials: number, initial_x: number) {
  function iter(trials_remaining, trials_passed, x) {
    const x1 = rand_update(x);
    const x2 = rand_update(x1);
    return trials_remaining === 0
      ? trials_passed / trials
      : gcd(x1, x2) === 1
      ? iter(trials_remaining - 1, trials_passed + 1, x2)
      : iter(trials_remaining - 1, trials_passed, x2);
  }
  return iter(trials, 0, initial_x);
}

/* 
  3.5 矩形随机产生点，落在圆内的概率
  圆 (5,7)半径3 
  矩形 对角位置(2,4)(8,10)
  矩形刚好包住圆 概率应为pi/4
*/
/**
 * 生成[low,high]区间的随机数
 *
 * @param {number} low
 * @param {number} high
 */
function randomInRange(low: number, high: number) {
  return low + Math.random() * (high - low);
}
/**
 * 生成一次落点 和 落点的是否在圆内判定
 *
 */
function roundAndRectangleTest() {
  // 落点
  const x = randomInRange(2, 8);
  const y = randomInRange(4, 10);

  // 判断是否在圆内
  return (x - 5) ** 2 + (y - 7) ** 2 <= 9;
}
/**
 * 计算pi pi/4 * 4
 *
 * @param {number} rounds
 * @return {*}
 */
function estimatePI2(rounds: number) {
  return monte_carlo(rounds, roundAndRectangleTest) * 4;
}
console.log(estimatePI2(1000000));

// 3.6 rand function增加reset功能
function make_rand2(order: "reset" | "generate", initial = 123456789) {
  let _randGenerator = make_rand(initial);
  if (order === "reset") {
    _randGenerator = make_rand(initial);
  }
  return _randGenerator();
}
