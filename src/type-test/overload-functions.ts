// 函数的重载
// 1. 函数的重载主要用于函数有多种类型的输入时 声明其对应类型的输出
// 2. 函数的本体只能有一个 但是重载的函数可以有很多 在编译时会用到

// 类型1 union类型重载
function reverse(string: string): string;
function reverse(stringArray: string[]): string[];
// 数组就反转数组 字符串就先变为数组再反转 再变回数组
function reverse(stringOrStringArray: string | string[]) {
  if (Array.isArray(stringOrStringArray)) {
    return stringOrStringArray.slice().reverse();
  } else {
    return stringOrStringArray.split("").reverse().join("");
  }
}

const hello = reverse("hello"); // 'olleh'
const hello_2 = reverse("hello".split("")); //'olleh'.split('')

// 类型2 可选值重载
function specialAdd(num: number): number;
function specialAdd(num: number, base1: number, base2: number): number;
function specialAdd(num: number, base1?: number, base2?: number) {
  let result = num;
  if (typeof base1 != "undefined") {
    result += base1;
  }
  if (typeof base2 != "undefined") {
    result += base2;
  }
  return result;
}
// 本来是可以的 重载后没有该类型 会返回错误
// specialAdd(1, 2);
