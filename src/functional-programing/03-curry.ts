declare type FNCurry = (...args: Array<any>) => any;

// Y-Combination
function curry2(f: FNCurry) {
  const g = (...args: Array<any>) => {
    if (args.length >= f.length) {
      return f(...args);
    }

    return (...left: Array<any>) => {
      return g(...args, ...left);
    };
  };
  return g;
}

function _add(a: number, b: number, c: number, d: number) {
  return a + b + c + d;
}
const add = curry2(_add);

console.log(add(1, 2, 3, 4));
console.log(add(1, 2)(3)(4));
console.log(add(1, 2)(3, 4));
