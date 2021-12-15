type PersonArea = {
  name: string;
  personCount: number;
  area: number;
};

// 给定社团人数 和对应草场面积 求不到150人可以获取的最大面积(0 1 背包问题)
function getMaxArea(limit: number, areaArr: PersonArea[]) {
  const resultArr = Array.from({ length: limit + 1 }).map((item) => 0);
  // console.log(areaArr);

  areaArr.forEach(({ area, personCount }) => {
    for (let i = limit; i >= personCount; i--) {
      // 状态转移 从后向前转移 实际是0-1背包遍历
      resultArr[i] = Math.max(resultArr[i], resultArr[i - personCount] + area);
    }
  });
  return resultArr[limit];
}
// 输出对应的社团 状态转移方程 同时记录转移路径
function getMaxGroup(limit: number, areaArr: PersonArea[]) {
  const dpArr = Array.from({ length: areaArr.length + 1 }).map((item) =>
    Array.from({ length: limit + 1 }).map((item, index) => {
      return {
        // trace
        prevIndex: 0,
        value: 0,
      };
    })
  );

  // dp[i][v]=max{dp[i-1][v],dp[i-1][v-c[i]]+w[i]}
  areaArr.forEach(({ area, personCount }, i) => {
    // 没有要求全部装满 所以可以跳过0 默认为0
    for (let j = 1; j < limit + 1; j++) {
      const left = dpArr[i][j].value;
      if (j < personCount) {
        dpArr[i + 1][j] = {
          value: left,
          prevIndex: j,
        };
        continue;
      }

      const right = dpArr[i][j - personCount].value + area;

      dpArr[i + 1][j] =
        left > right
          ? {
              value: left,
              prevIndex: j,
            }
          : {
              value: right,
              prevIndex: j - personCount,
            };
    }
  });
  // 打印路径
  const tracePrint = () => {
    const traceArr: number[] = [];
    let currIndex = limit;
    for (let i = dpArr.length - 1; i > 0; i--) {
      const currTrace = dpArr[i][currIndex];
      // 如果和当前index不同 说明加入了该项 同时改变trace的index
      if (currTrace.prevIndex !== currIndex) {
        traceArr.push(i-1);
        currIndex = currTrace.prevIndex;
      }
    }
    console.log(
      traceArr.map((i) => areaArr[i].area).reduce((acc, curr) => acc + curr, 0)
    );
    return traceArr
      .reverse()
      .map((index) => areaArr[index].name)
      .join(",");
  };

  console.log(tracePrint());
  return dpArr[areaArr.length][limit].value;
}

const AREA_ARR: PersonArea[] = [
  {
    name: "棒球",
    area: 11000,
    personCount: 40,
  },
  {
    name: "足球",
    area: 8000,
    personCount: 30,
  },
  {
    name: "排球",
    area: 400,
    personCount: 24,
  },
  {
    name: "篮球",
    area: 800,
    personCount: 20,
  },
  {
    name: "网球",
    area: 900,
    personCount: 14,
  },
  {
    name: "田径",
    area: 1800,
    personCount: 16,
  },
  {
    name: "手球",
    area: 1000,
    personCount: 15,
  },
  {
    name: "橄榄球",
    area: 7000,
    personCount: 40,
  },
  {
    name: "乒乓球",
    area: 100,
    personCount: 10,
  },
  {
    name: "羽毛球",
    area: 300,
    personCount: 12,
  },
];
// console.log(getMaxArea(150, AREA_ARR));
console.log(getMaxGroup(150, AREA_ARR));
