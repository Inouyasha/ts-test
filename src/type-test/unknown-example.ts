let exampleAny: any;
let exampleUnknown: unknown;

// any
exampleAny = 123;
exampleAny = "Hello";

// unknown
exampleUnknown = 123;
exampleUnknown = "Hello";

// any处理 可以当作任意的类型控制
exampleAny.allows.anything.you.can.imagine();
let anySetBool: boolean = exampleAny;

// unknown类型可以被赋值，但是如果要把它当作莫种类型使用 需要先判断它的类型
// exampleUnknown.trim();
// let unknownSetBool: boolean = exampleUnknown;

// 所以如果不确定要使用的类型 和使用unknown而不是使用any 这样类型检查会让你在编译时对你要做的操作进行类型判断
if (typeof exampleUnknown === "string") {
  exampleUnknown.trim();
}
if (typeof exampleUnknown === "boolean") {
  let unknownSetBool: boolean = exampleUnknown;
}
