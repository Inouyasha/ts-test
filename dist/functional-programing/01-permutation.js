"use strict";
// 输入一个字符串，输出字符串的全排列
// 基础思路 交换字符后递归
function permutation(str) {
    // 输入为字符数组['a', 'b', 'c']
    function R(strArr) {
        //   只有一个字符直接输出
        if (strArr.length === 1) {
            return [...strArr];
        }
        const charSet = new Set();
        // 这里可以用reduce实现 但是感觉更难看懂
        let retArr = [];
        for (let i = 0; i !== strArr.length; i++) {
            const char = strArr[i];
            // 避免重复排列 重复排列跳过
            if (charSet.has(char)) {
                continue;
            }
            charSet.add(char);
            // 输出
            retArr = [
                ...retArr,
                // 将序列中字符提前后 和所有其他字符进行组合
                ...R(strArr.filter((c, index) => index !== i)).map((str) => {
                    return char + str;
                }),
            ];
        }
        return retArr;
    }
    return R([...str]);
}
console.log(permutation("aaaa"));
//# sourceMappingURL=01-permutation.js.map