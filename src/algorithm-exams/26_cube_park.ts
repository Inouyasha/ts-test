export type Coordinate = [number, number];

/*
 * 这个代码花了很久 原因总结下：
 * 1. 把广度遍历写成了深度优先（层序遍历变成了递归遍历，应该是按层递归，把下一层要用的状态保存然后给下层使用）
 * 2. 循环状态的处理
 * 3. 状态遍历的处理（避免重复访问，将一个有向图变成了一个树的访问，保存的访问状态没有处理好）
 * 4. 广度优先的思考 首先是层序遍历（准备好下一层的数据，尾递归）；其次是标识node的访问状态，避免重复访问节点；确认访问状态（在每次push新节点前，判断是否已存在has，存在放弃，不存在push并记录状态）
 */

class RecordMemory {
  // 保存状态的dict 状态的key可以解析当前坐标点 和 空位置坐标点
  memory: { [key: string]: number };

  constructor() {
    this.memory = {};
  }

  // 根据数据生成键
  private getKey(pos: Coordinate, space: Coordinate) {
    return `${pos.map((item) => item.toString()).join(",")};${space
      .map((item) => item.toString())
      .join(",")}`;
  }

  push(pos: Coordinate, space: Coordinate, count: number) {
    const key = this.getKey(pos, space);
    this.memory[key] = count;
  }

  has(pos: Coordinate, space: Coordinate) {
    const key = this.getKey(pos, space);
    return key in this.memory;
  }

  get(pos: Coordinate, space: Coordinate) {
    const key = this.getKey(pos, space);
    return key in this.memory ? this.memory[key] : -1;
  }
}

/**
 * width*height 华容道样式的积木 将左上角的点挪到右下角需要的最小步数
 *
 * @param {number} width
 * @param {number} height
 */
function getMinCount(width: number, height: number) {
  // 思路 动态规划的思路 从终点到起点的最小步数

  // 路径记录 key为空点
  const pathMemory = new RecordMemory();

  // 四个方向
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  let result: number;
  // 广度优先遍历 每一次输出同一深度的所有情况
  const moveRecursion = (
    targetList: {
      // 空格 我们移动的对象
      space: Coordinate;
      // 目标 用来记录状态
      target: Coordinate;
    }[],
    steps: number
  ) => {
    // 空格 我们移动的对象
    const newTargetList: {
      space: Coordinate;
      // 目标 用来记录状态
      target: Coordinate;
    }[] = [];

    targetList.forEach(({ target, space }) => {
      // 到达位置
      if (target[0] === width - 1 && target[1] === height - 1) {
        result = steps;
        return;
      }
      directions.forEach(([dw, dh]) => {
        const nw = space[0] + dw;
        const nh = space[1] + dh;
        // 边界
        if (nw < 0 || nw >= width || nh < 0 || nh >= height) {
          return;
        }
        if (nw === target[0] && nh === target[1]) {
          // 交换位置
          if (!pathMemory.has(space, target)) {
            newTargetList.push({ target: [...space], space: [...target] });
            pathMemory.push([...space], [...target], steps + 1);
          }
        } else {
          if (!pathMemory.has(target, [nw, nh])) {
            newTargetList.push({ target: [...target], space: [nw, nh] });
            pathMemory.push([...target], [nw, nh], steps + 1);
          }
        }
      });
    });

    // 已经得到结果
    if (result != null) {
      return;
    } else {
      newTargetList.forEach(({ target, space }) => {
        pathMemory.push([...target], [...space], steps + 1);
      });
      moveRecursion(newTargetList, steps + 1);
    }
  };
  pathMemory.push([0, 0], [width - 1, height - 1], 0);
  moveRecursion([{ space: [width - 1, height - 1], target: [0, 0] }], 0);
  return result;
}
console.log(getMinCount(10, 10));
