import * as R from "ramda";

declare type FN = (...args: Array<any>) => any;

function curry(func: FN) {
  const g = (...ags: any[]) => {
    if (ags.length >= func.length) {
      return func(...ags);
    }

    return (...left: any[]) => {
      return g(...ags, ...left);
    };
  };
  return g;
}

function compose(...funcs: FN[]) {
  // 右reduce 就是compose的行为
  return (...args: any[]) => {
    return funcs.reduceRight((acc, curr) => {
      // 调用当前的func
      return [curr.apply(null, acc)];
    }, args)[0];
  };
}
