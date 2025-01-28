/**
 * 计算函数y=f(x1,x2,x3,x4)=1/(1+abs(x1)+abs(x2)+abs(x3)+abs(x4))
 * 在-10<=x1,x2,x3,x4<=10区间上y的最大值
 *
 * 使用遗传算法进行最优化搜索
 */

import Decimal from "decimal.js";

abstract class GeneticAlgorithm<T> {
  abstract N: number; // 种群规模
  abstract MAX_GENERATION: number; // 最大进化代数
  abstract mateProbability: number; // 交配概率
  abstract mutationProbability: number; // 交配概率
  bestValue: number = -Infinity; // 最佳适应值
  bestSpecies!: T;
  generation: number = 0; // 当前进化代数
  currSpecies!: T[];
  distribution!: number[];

  constructor() {}

  protected abstract initialize(): T[]; // 初始化函数
  protected abstract evaluate(species: T): number; // 评价函数
  protected abstract exchange(species: T[]): T[]; // 交换算子
  protected abstract mutation(species: T[]): T[]; // 变异算子
  protected abstract canStop(): boolean; // 结束条件

  // 根据当前分布选择新的种群的开始基因
  protected selection(): T[] {
    // 生成N个[0,1]随机数 用于产生物种
    const selectionValues = Array.from({ length: this.N }, () => {
      return Math.random();
    });

    // 随机选择第一轮新的物种基因 目标为按照分布选择对应基因
    const newSpecies: T[] = selectionValues.map((item) => {
      let probability = 0;
      for (let i = 0; i !== this.N; i++) {
        const gen = this.distribution[i];
        probability += gen;
        if (probability > item) {
          return this.currSpecies[i];
        }
      }
      // 总会返回 如果都没有返回最后一个
      return this.currSpecies[this.N - 1];
    });
    return newSpecies;
  }

  public evaluateSpecies() {
    const scores: number[] = [];
    let total = new Decimal(0);
    let bestScore = -Infinity;
    let bestItem!: T;

    for (const item of this.currSpecies) {
      const score = new Decimal(this.evaluate(item)).toDP(4).toNumber(); // 保留4位
      scores.push(score);
      total = total.plus(score);

      // 更新最佳
      if (score > bestScore) {
        bestScore = score;
        bestItem = item;
      }
    }

    // 计算分布
    const newDistribution = scores.map((score) => {
      return new Decimal(score).div(total).toDP(4).toNumber();
    });

    // 更新各项结果
    if (this.bestValue < bestScore) {
      this.bestSpecies = bestItem;
      this.bestValue = bestScore;
    }
    this.distribution = newDistribution;
  }

  public process() {
    this.currSpecies = this.initialize(); // 初始化群体
    this.evaluateSpecies(); // 根据算法进行评分 输出分布 和 设置最佳基因

    while (!this.canStop()) {
      this.generation++;
      const selectSpecies = this.selection(); // 选择种群
      const mateSpecies = this.exchange(selectSpecies); // 随机交配
      const mutationSpecies = this.mutation(mateSpecies); // 随机变异

      // 重新度量
      this.currSpecies = mutationSpecies;
      this.evaluateSpecies();
      // 继续循环到下一代
      this.output();
    }
  }

  public output() {
    console.log(
      `最优解 ${JSON.stringify(this.bestSpecies)}, 值为${this.bestValue}`
    );
  }
}

type num4Arr = [number, number, number, number];

class PolynomialGeneticAlgorithm extends GeneticAlgorithm<num4Arr> {
  N = 100;
  MAX_GENERATION = 500;
  mateProbability = 0.85;
  mutationProbability = 0.1;

  // 修改点3：优化初始化精度
  protected initialize(): num4Arr[] {
    return Array.from({ length: this.N }, () => {
      return Array.from({ length: 4 }, () =>
        new Decimal(Math.random()).mul(20).minus(10).toDP(4).toNumber()
      );
    }) as num4Arr[];
  }

  // 修改点4：移除精度截断
  protected evaluate(species: num4Arr) {
    return new Decimal(1)
      .div(
        new Decimal(1)
          .plus(new Decimal(species[0]).abs())
          .plus(new Decimal(species[1]).abs())
          .plus(new Decimal(species[2]).abs())
          .plus(new Decimal(species[3]).abs())
      )
      .toDP(4)
      .toNumber();
  }

  // 修改点5：改进交叉策略
  protected exchange(species: num4Arr[]): num4Arr[] {
    const mateList: num4Arr[] = []; // 要交配的
    const unMateList: num4Arr[] = []; // 不交配的
    for (const item of species) {
      const rand = Math.random();
      // 如果随机数超出概率不参与交配
      if (rand > this.mateProbability) {
        unMateList.push(item);
      } else {
        mateList.push(item);
      }
    }

    // 交换两个基因
    const change2Species = (item1: num4Arr, item2: num4Arr) => {
      const exChangePos: number[] = [];
      // 50%概率设置交换的位置
      for (let i = 0; i !== 4; i++) {
        if (Math.random() > 0.5) {
          exChangePos.push(i);
        }
      }

      // 交换
      for (const pos of exChangePos) {
        [item1[pos], item2[pos]] = [item2[pos], item1[pos]];
      }
    };

    // 对交配序列开始交配
    for (let i = 0; i < mateList.length; i += 2) {
      // 如果最后一项是奇数 跳过
      if (i + 1 >= mateList.length) {
        break;
      }
      change2Species(mateList[i], mateList[i + 1]);
    }

    // 返回交换基因后的物种
    return [...mateList, ...unMateList];
  }

  // 修改点6：改进变异策略
  // 这一点是成功的关键 如果直接式用随机数，结果会大概率无法走向最优，因为扰动太大了
  // 所以变异的步长很关键
  protected mutation(species: num4Arr[]): num4Arr[] {
    return species.map((item) => {
      return item.map((x, i) => {
        if (Math.random() < this.mutationProbability) {
          // 小幅扰动代替完全重置
          const delta = (Math.random() - 0.5) * 0.5; // ±0.25范围
          return Number(Math.max(-10, Math.min(10, x + delta)).toFixed(4));
        }
        return x;
      }) as num4Arr;
    });
  }

  // 修改点7：添加精英保留
  public process() {
    this.currSpecies = this.initialize();
    this.evaluateSpecies();

    while (!this.canStop()) {
      this.generation++;

      const selectSpecies = this.selection();
      const mateSpecies = this.exchange(selectSpecies);
      const mutationSpecies = this.mutation(mateSpecies);

      // 用最佳个体替换最差个体
      const all = [...mutationSpecies, this.bestSpecies];
      all.sort((a, b) => this.evaluate(b) - this.evaluate(a));
      this.currSpecies = all.slice(0, this.N);

      this.evaluateSpecies();
      this.output();
    }
  }

  protected canStop(): boolean {
    return this.generation >= this.MAX_GENERATION;
  }
}

// 使用方式保持不变
const instance = new PolynomialGeneticAlgorithm();
instance.process();
instance.output();
