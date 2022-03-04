import { Func } from "./pair";

// 由于需要迭代计算 需要函数的输入和输出类型相同
type churchFunc<T> = (x: T) => T;
type churchType<T> = (f: churchFunc<T>) => churchFunc<T>;

// Church numerals
const zero =
  <T>(f: churchFunc<T>) =>
  (x: T) =>
    x;

// church数到普通数字
function churchToNumber(cNum: churchType<number>) {
  return cNum((x: number) => x + 1)(0);
}

function add_1<T>(n: churchType<T>) {
  return (f: churchFunc<T>) => (x: T) => f(n(f)(x));
}
// 整数对应了函数f对参数x的迭代次数 要求的f是同类的
const one =
  <T>(f: churchFunc<T>) =>
  (x: T) =>
    f(x);
const two =
  <T>(f: churchFunc<T>) =>
  (x: T) =>
    f(f(x));

function add<T>(n1: churchType<T>, n2: churchType<T>) {
  return (f: churchFunc<T>) => (x: T) => n2(f)(n1(f)(x));
}
