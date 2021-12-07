/**
 * 计算开始10枚硬币 一回合可以获取或失去1枚硬币 24回合后还能剩余硬币的变化情况有几种
 *
 * @param {number} coin 剩余硬币数
 * @param {number} round 剩余回合数
 */
function getCoinSituation(coin: number, round: number) {
  if (coin === 0) return 0;
  if (round === 0) return 1;

  return (
    getCoinSituation(coin + 1, round - 1) +
    getCoinSituation(coin - 1, round - 1)
  );
}
console.log(getCoinSituation(10, 24));

// 可以使用动态规划实现 减少递归层数