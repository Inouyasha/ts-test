type Coordinate = [number, number];

// 快速解析坐标点 同时方便dict保存
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
          if (!pathMemory.has(space, target))
            newTargetList.push({ target: [...space], space: [...target] });
        } else {
          if (!pathMemory.has(target, [nw, nh]))
            newTargetList.push({ target: [...target], space: [nw, nh] });
        }
      });

      // 已经得到结果
      if (result != null) {
        return;
      } else {
        newTargetList.forEach(({ target, space }) => {
          pathMemory.push([...target], [...space], steps);
        });
        moveRecursion(newTargetList, steps + 1);
      }
    });
  };
  pathMemory.push([0, 0], [width - 1, height - 1], 0);
  moveRecursion([{ space: [width - 1, height - 1], target: [0, 0] }], 0);
  return result;
}
console.log(getMinCount(3, 3));
