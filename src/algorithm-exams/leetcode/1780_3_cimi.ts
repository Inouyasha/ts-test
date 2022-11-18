function checkPowersOfThree(n: number): boolean {
  // 转3进制
  const scaleTransform = (num: number, scale: number = 3): string => {
    let result = "";
    let temp = num;

    while (temp >= scale) {
      // 商
      const a = Math.floor(temp / scale);
      // 余数
      const r = temp % scale;

      // 余数在头部
      result = r.toString() + result;
      // 商在下一轮运算
      temp = a;
    }
    result = temp.toString() + result;
    return result;
  };

  const numThree = scaleTransform(n, 3);
  // 判断进制只有0和1
  return numThree.split("").every((c) => c === "0" || c === "1");
}
console.log(checkPowersOfThree(91));
