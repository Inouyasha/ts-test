/**
 * 34. 两个人命中的相遇 M*N的矩形 两个人从两个角出发 相遇的次数
 */
// 回溯
function getMeetCount(width: number, height: number) {
  let count = 0;
  const manDir = [
    [1, 0],
    [0, 1],
  ];
  const womanDir = [
    [-1, 0],
    [0, -1],
  ];

  const meetRecursion = (
    manCoor: [number, number],
    womanCoor: [number, number],
    meetCount: number
  ): void => {
    // 边界
    if (
      manCoor[0] < 0 ||
      manCoor[0] > width ||
      manCoor[1] < 0 ||
      manCoor[1] > height ||
      womanCoor[0] < 0 ||
      womanCoor[0] > width ||
      womanCoor[1] < 0 ||
      womanCoor[1] > height
    ) {
      return;
    }

    // 判断男女是否在一条直线上
    if (manCoor[0] === womanCoor[0]) meetCount++;
    if (manCoor[1] === womanCoor[1]) meetCount++;

    // 走到尽头时判断相遇次数 如果>=2 count+1
    if (manCoor[0] === width && manCoor[1] === height) {
      count += meetCount < 2 ? 0 : 1;
      return;
    }

    // 向下走
    manDir.forEach(([mdx, mdy]) => {
      womanDir.forEach(([wdx, wdy]) => {
        meetRecursion(
          [manCoor[0] + mdx, manCoor[1] + mdy],
          [womanCoor[0] + wdx, womanCoor[1] + wdy],
          meetCount
        );
      });
    });
  };

  meetRecursion([0, 0], [width, height], 0);
  console.log({ count });
}
getMeetCount(6, 6);
