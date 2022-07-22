/**
 * Think of Types as Sets of Values
 * 认为每一种ts中的类型对应了一个集合，比如数字集合(1,2,1.5,-1)，字符串集合('abc')等
 * 变量代表集合的一种元素，如果元素属于集合，就可以匹配成功
 *
 * 如果等式左边元素的类型集合包含右边元素的类型集合，可以赋值；否则不能赋值
 *
 *
 */

// 空集 never
// const x: never = 12; // ~ Type '12' is not assignable to type 'never'

// 单元素集合 unit type
type A = "A";
type B = "B";
type Twelve = 12;
// const t: Twelve = 13; 错误的类型分配

// 并集 union types
type AB = "A" | "B";
type AB12 = "A" | "B" | 12;
const a: AB = "A"; // OK, value 'A' is a member of the set {'A', 'B'}
// const c: AB = "C"; // ~ Type '"C"' is not assignable to type 'AB'

// OK, {"A", "B"} is a subset of {"A", "B"}:
const ab: AB = Math.random() < 0.5 ? "A" : "B";
const ab12: AB12 = ab; // OK, {"A", "B"} is a subset of {"A", "B", 12}
let twelve: AB12;
// AB
// const back: AB = twelve;// ~~~~ Type 'AB12' is not assignable to type 'AB' // Type '12' is not assignable to type 'AB'

/* 
  同时需要注意上面讨论的是有限集，实际上也有无限集，比如number
  还有interface的关系
*/
interface Person1 {
  name: string;
}
interface Lifespan {
  birth: Date;
  death?: Date;
}
// interface的&会让新的interface包含所有前interface的key
type PersonSpan = Person1 & Lifespan;

const ps: PersonSpan = {
  name: "Alan Turing",
  birth: new Date("1912/06/23"),
  death: new Date("1954/06/07"),
}; // OK

type K = keyof (Person | Lifespan); // Type is never
const k1: any = 2;

/* any是除never外的所有类型 它是一种作弊类型hack */
// 即使是any也不能赋值给never
// const k: K = k1;

const k3: any = 3;
const k4: number = 3;
const k5: 2 = k3; // any类型可以分配给2 事实上any类型
// const k6: 2 = k4; // number类型不能分配给2

/**
 * A&B 标识 将B的property加入A
 * A|B(不常用) 标识A中包含的B中的interface 返回的interface没有可选的property(?)
 *
 */
// keyof (A&B) = (keyof A) | (keyof B)
// keyof (A|B) = (keyof A) & (keyof B)

// 另一种接口扩展
interface Person2 {
  name: string;
}
interface PersonSpan2 extends Person2 {
  birth: Date;
  death?: Date;
}

// 使用extend创建的类型会有一种类似于父类子类的层级关系
// You’d say that a Vector3D is a subtype of Vector2D, which is a subtype of Vector1D
interface Vector1D {
  x: number;
}
interface Vector2D extends Vector1D {
  y: number;
}
interface Vector3D extends Vector2D {
  z: number;
}
// 一样的实现，但是体现不出subtype的层级关系
interface Vector1D {
  x: number;
}
interface Vector2D {
  x: number;
  y: number;
}
interface Vector3D {
  x: number;
  y: number;
  z: number;
}

/** 另外的extends形式 泛型定义中的extends的理解 */
function getKey<K extends string>(val: any, key: K) {
  // ...
}
// 这里泛型K extends string 标识K为string的子集
getKey({}, "x"); // OK, 'x' extends string
getKey({}, Math.random() < 0.5 ? "a" : "b"); // OK, 'a'|'b' extends string
getKey({}, document.title); // OK, string extends string
// getKey({}, 12); // ~~ Type '12' is not assignable to parameter of type 'string'

// 类似的 仍然可以使用子集理论解释通
interface Point1 {
  x: number;
  y: number;
}
type PointKeys = keyof Point1; // Type is "x" | "y"
function sortBy<K extends keyof T, T>(vals: T[], key: K): T[] {
  // ...
  return [];
}
const pts: Point[] = [
  { x: 1, y: 1 },
  { x: 2, y: 0 },
];
sortBy(pts, "x"); // OK, 'x' extends 'x'|'y' (aka keyof T)
sortBy(pts, "y"); // OK, 'y' extends 'x'|'y'
sortBy(pts, Math.random() < 0.5 ? "x" : "y"); // OK, 'x'|'y' extends 'x'|'y'
// sortBy(pts, "z"); // ~~~ Type '"z"' is not assignable to parameter of type '"x" | "y"

// unknown是一个universal set 可以把任意的值赋给它 但是它作为最大集合不能赋值给任何类型
// 对于不了解的类型 应该优先赋值为unknown而非any可以多check一次
const a1: unknown = "abc";
const a2: unknown = 1;
const a3: unknown = 2;
const a4: number = a2 as number;

interface Person2 {
  name: string;
}

/* Item8 类型声明 A:typeA > 类型断言 A as typeA */
// const bob0: Person2 = {}; // declaration会报错
// 使用as的形式 会是一种强制声明 不会报错
const bob1: Person2 = <Person2>{}; // No error
const bob2: Person2 = {} as Person2; // No error

// 一个常见的场景
const people1 = ["alice", "bob", "jan"].map((name) => ({ name })); // 类型推断不会自动设置为Person2[] 而是 string[]

// 使用as不会有报错 有欺骗效应
const people2 = ["alice", "bob", "jan"].map((name) => ({ name } as Person2));
const people3 = ["alice", "bob", "jan"].map((name) => ({} as Person2));

// 一个可能的好办法 完成了declaration 但是很繁琐
const people4 = ["alice", "bob", "jan"].map((name) => {
  const person: Person2 = { name };
  return person;
});
// 改进 事实上真正的declaration发生在函数传入时 所以4，5都可以 5比较简单
// 给函数增加输出标识是个好习惯
const people5 = ["alice", "bob", "jan"].map((name): Person2 => ({ name }));
// 更好的习惯 更能避免错误 一般用于很复杂的函数式编程
const people6: Person2[] = ["alice", "bob", "jan"].map(
  (name): Person2 => ({ name })
);

// 什么时候使用类型断言type assertion => 你比ts更知道一个类型是什么
document.querySelector("#myButton")!.addEventListener("click", (e) => {
  e.currentTarget; // Type is EventTarget
  const button = e.currentTarget as HTMLButtonElement;
  button; // Type is HTMLButtonElement
});

// 避免判断isNull => 前提是你ensure一个变量绝对是非空的 => 使用!(也是type assertion)
const elNull = document.getElementById("foo"); // Type is HTMLElement | null
const el = document.getElementById("foo")!; // Type is HTMLElement

// type assertion的使用条件 as 子集 {}是Person2的子集 HTMLElement是HTMLElement | null的子集
// const el2 = document.body as Person2; // 不是随便一个都可以as的
const el3 = document.body as unknown as Person2; // Person2是unknown的子集

/* Item11:  属性匹配与接口赋值 */
interface Options {
  title: string;
  darkMode?: boolean;
}
// object的声明 只关心属性是否匹配
// const o1: Options = { darkmode: true, title: "Ski Free" }; // ~~~~~~~~ 'darkmode' does not exist in type 'Options'...
// 通过中间声明来赋值 会关心子集关系
const intermediate = { darkmode: true, title: "Ski Free" };

const o2: Options = intermediate; // OK
interface Options2 {
  darkMode?: boolean;
  // 额外项的类型必须包含已有项
  [otherOptions: string]: unknown;
}
// 不过感觉不太好用
const o3: Options2 = { darkmode: true }; // OK
const dm = o3.darkmode;

// weak interface 所有属性都是optional
interface LineChartOptions {
  logScale?: boolean;
  invertedYAxis?: boolean;
  areaChart?: boolean;
}
const opts1 = { logscale: true };

// const o4: LineChartOptions = opts1; // 必须要有交集才能赋值
// 空集也可以
const o4: LineChartOptions = {};

/**
 * type和interface之间的差别
 *
 * type支持union的形式 'a'|'b'
 * interface更好的支持扩展 可以增强式开发
 *
 * 除此之外 基本上是通用的 interface只能局限于去表示一个简单object，而type可以去表示复杂类型
 * 除此之外则是看项目的编码习惯更倾向于用哪一种
 *
 * 我的看法是，interface是一个struct表示，而type是一个类型的表示，它是一个集合体的表现
 *
 */

// 同一个interface的多次声明会进行合并(augmented)
interface IState {
  name: string;
  capital: string;
}
interface IState {
  population: number;
}
const wyoming: IState = {
  name: "Wyoming",
  capital: "Cheyenne",
  population: 500_000,
}; // OK

/** 在下面的块作用域里，既可以重设id，也可以直接使用之前的id，也可以重新设置新的id将外层作用域的id覆盖
 *
 * 变量可以变，但是类型不会变
 * While a variable’s value can change, its type generally does not
 */
const id = "abc";
{
  // const xxx = id;
  const id = 12345;
  const xxxx = id;
}

/** Item 21 Type Widening
 *  let声明一个变量时，变量的类型通常会是赋值类型的超集(是由它可赋值的类型确定的，而不是它当前类型确定的)
 */
interface Vector3 {
  x: number;
  y: number;
  z: number;
}
function getComponent(vector: Vector3, axis: keyof Vector3) {
  return vector[axis];
}

// const x1 = 'x'; // const 产生的类型是"x"
let x1 = "x"; // let 产生的类型是string 因为它随可能会变成别的string 比如 x1='f'
/**
 * But it would also be valid JavaScript to write:
  let x = 'x';
  x = /x|y|z/;
  x = ['x', 'y', 'z'];
  In inferring the type of x as string, TypeScript attempts to strike a balance between
  specificity and flexibility. The general rule is that a variable’s type shouldn’t change
  after it’s declared (Item 20), so string makes more sense than string|RegExp or
  string|string[] or any.

  在js中，变量声明后，仍可以随意赋值。而ts在变量声明后，其类型固定（strike a balance between specificity and flexibility），因此一个string的类型最多允许扩展到string或regexp
 */
// x1 = /abc/; // 事实上也不允许。。
let vec = { x: 10, y: 20, z: 30 };
getComponent(vec, x1 as "x");

// object的Type Widening
const v1 = {
  x: 1,
  y: 2,
}; // Type is { x: number; y: number; } 从这里就能看出它的可改变性，即可以 v1.x = 2这样
v1.x = 2;
const v2 = {
  x: 1 as const,
  y: 2,
}; // Type is { x: 1; y: number; }
// v2.x = 2; // 不能将类型“2”分配给类型“1”
const v3 = {
  x: 1,
  y: 2,
} as const; // Type is { readonly x: 1; readonly y: 2; } 什么也不能改的object

/** Item 21 Understand Type Narrowing
 *  对一个union type 怎么样让系统识别它是某种类型
 */

// 几种基础的识别方式
// 1 null check
const el2 = document.getElementById("foo"); // Type is HTMLElement | null
// 类型判断会帮助系统narrow type 求差集
if (el2) {
  el2; // Type is HTMLElement
  el2.innerHTML = "Party Time".blink();
} else {
  el2; // Type is null
  alert("No element #foo");
}
// 2 instanceof
function contains(text: string, search: string | RegExp) {
  if (search instanceof RegExp) {
    search; // Type is RegExp
    return !!search.exec(text);
  }
  search; // Type is string
  return text.includes(search);
}
// 3 property in 用于interface之间有差别
interface A1 {
  a: number;
  b: number;
}
interface B1 {
  b: number;
}
function pickAB(ab: A1 | B1) {
  if ("a" in ab) {
    ab; // Type is A
  } else {
    ab; // Type is B
  }
  ab; // Type is A | B
}
// 4 isArray
// 查询text是否再terms中
function contains2(text: string, terms: string | string[]) {
  const termList = Array.isArray(terms) ? terms : [terms];
  return termList.includes(text);
}
// 5 set type property to distinguish 如: Square和Circle
interface Square {
  type: "square";
  width: number;
  height: number;
}
interface Circle {
  type: "circle";
  radius: number;
}
type Geometry = Square | Circle;
function getArea(g: Geometry): number {
  // 感觉type 会识别对应的interface
  switch (g.type) {
    case "square":
      return g.width * g.height;

    case "circle":
      return Math.PI * g.radius * g.radius;
  }
}
// 6 function indicates type
const xiao = ["大蛇丸", "角都", "飞段", "佩恩", "鼬", "鬼鲛"];
const members = ["大蛇丸", "佐助"];
// 返回在member在晓的人 members1: (string | undefined)[]
const members1 = members
  .map((who) => xiao.find((n) => n === who))
  .filter((who) => who !== undefined);
// 声明一个筛选函数 具备类型筛选的能力
// 返回boolean值 但是具有类型的说明能力 用于narrow
function isDefined<T>(x: T | undefined): x is T {
  return typeof x !== "undefined";
}
const members2 = members
  .map((who) => xiao.find((n) => n === who))
  .filter(isDefined);

// interface CameraOptions {
//   center?: LngLat;
//   zoom?: number;
//   bearing?: number;
//   pitch?: number;
// }
// type LngLat =
//   | { lng: number; lat: number }
//   | { lon: number; lat: number }
//   | [number, number];
// type LngLatBounds =
//   | { northeast: LngLat; southwest: LngLat }
//   | [LngLat, LngLat]
//   | [number, number, number, number];

interface LngLat {
  lng: number;
  lat: number;
}
type LngLatLike = LngLat | { lon: number; lat: number } | [number, number];
interface Camera {
  center: LngLat;
  zoom: number;
  bearing: number;
  pitch: number;
}

/**
 * Item 31: Push Null Values to the Perimeter of Your Types
 *
 * 如果涉及一个object的多项都有非空检查 可以考虑把这些项目合并到一起进行处理和统一的检查（前提是它们是同级的）
 */
function extent1(nums: number[]) {
  let min: number | undefined = undefined,
    max: number | undefined = undefined;
  for (const num of nums) {
    if (!min) {
      min = num;
      max = num;
    } else {
      min = Math.min(min, num);
      // 只检查了min 没有检查max 但事实上编程者知道当min被赋值后，max也被赋值了 另外还有问题就是如果出入为[]则输出[undefined,undefined]
      // max = Math.max(max, num);
      // ~~~ Argument of type 'number | undefined' is not
      // assignable to parameter of type 'number'
    }
  }
  return [min, max];
}
function extent2(nums: number[]) {
  // 将两个同级的结果写在一起 同步进行赋值操作 并且可以实现结果的默认值null
  let result: [number, number] | null = null;
  for (const num of nums) {
    if (!result) {
      result = [num, num];
    } else {
      result = [Math.min(num, result[0]), Math.max(num, result[1])];
    }
  }
  return result;
}

/**
 * Item 32: Prefer Unions of Interfaces to Interfaces of Unions
 *
 */
// 举例说明1
// Interfaces of Unions
// interface Layer1 {
//   layout: FillLayout | LineLayout | PointLayout;
//   paint: FillPaint | LinePaint | PointPaint;
// }
// interface FillLayer {
//   layout: FillLayout;
//   paint: FillPaint;
// }
// interface LineLayer {
//   layout: LineLayout;
//   paint: LinePaint;
// }
// Unions of Interfaces
// interface PointLayer {
//   layout: PointLayout;
//   paint: PointPaint;
// }
// type Layer2 = FillLayer | LineLayer | PointLayer;

// 举例说明2 类型的合并
interface BirthPerson {
  name: string;
  // These will either both be present or not be present
  // 要么同时optional 要么同时存在
  placeOfBirth?: string;
  dateOfBirth?: Date;
}
// 改进1
interface BirthPerson1 {
  name: string;
  // 属性合并
  birth?: {
    place: string;
    date: Date;
  };
}
// 改进2
interface Name {
  name: string;
}
interface PersonWithBirth extends Name {
  placeOfBirth: string;
  dateOfBirth: Date;
}
type BirthPerson2 = Name | PersonWithBirth;

function eulogize(p: BirthPerson2) {
  // 利用type narrow的特性
  if ("placeOfBirth" in p) {
    p; // Type is PersonWithBirth
    const { dateOfBirth } = p; // OK, type is Date
  }
}

// 如何精确描述一个特定长度的数组类型
// 又比如数组可能有不同的长度
type Expression4 = number | string | CallExpression;
type CallExpression = MathCall | CaseCall | RGBCall;
interface MathCall {
  0: "+" | "-" | "/" | "*" | ">" | "<";
  1: Expression4;
  2: Expression4;
  length: 3;
}
interface CaseCall {
  0: "case";
  1: Expression4;
  2: Expression4;
  3: Expression4;
  length: 4 | 6 | 8 | 10 | 12 | 14 | 16; // etc.
}

interface RGBCall {
  0: "rgb";
  1: Expression4;
  2: Expression4;
  3: Expression4;
  length: 4;
}

// const tests: Expression4[] = [
//   10,
//   "red",
//   true,
//   // ~~~ Type 'true' is not assignable to type 'Expression4'
//   ["+", 10, 5],
//   ["case", [">", 20, 10], "red", "blue", "green"],
//   // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   // Type '["case", [">", ...], ...]' is not assignable to type 'string'
//   ["**", 2, 31],
//   // ~~~~~~~~~~~~ Type '["**", number, number]' is not assignable to type 'string
//   ["rgb", 255, 128, 64],
//   ["rgb", 255, 128, 64, 73],
//   // ~~~~~~~~~~~~~~~~~~~~~~~~ Type '["rgb", number, number, number, number]'
//   // is not assignable to type 'string'
// ];

/**
 * Item 37: Consider “Brands” for Nominal Typing
 *
 * 标识类型的来源是自建的，套了一层壳，而这层壳实际上并不存在
 */
type AbsolutePath = string & { _brand: "abs" }; // _brand只是用来类型 对于实际值无效
function listAbsolutePath(path: AbsolutePath) {
  // ...
}
function isAbsolutePath(path: string): path is AbsolutePath {
  return path.startsWith("/");
}
// 同样都是path 必须是我要的path才能通过
function f(path: string) {
  if (isAbsolutePath(path)) {
    listAbsolutePath(path);
  }
  // listAbsolutePath(path);
  // ~~~~ Argument of type 'string' is not assignable
  // to parameter of type 'AbsolutePath'
}

// 检查
// binarySearch 要求输入的数组是有序数组
function binarySearch<T>(xs: T[], x: T): boolean {
  let low = 0,
    high = xs.length - 1;
  while (high >= low) {
    const mid = low + Math.floor((high - low) / 2);
    const v = xs[mid];
    if (v === x) return true;
    [low, high] = x > v ? [mid + 1, high] : [low, mid - 1];
  }
  return false;
}

type SortedList<T> = T[] & { _brand: "sorted" };
function isSorted<T>(xs: T[]): xs is SortedList<T> {
  for (let i = 1; i < xs.length; i++) {
    if (xs[i] > xs[i - 1]) {
      return false;
    }
  }
  return true;
}
// 此时只有有序的数组才能调用binarySearch2进行排序
function binarySearch2<T>(xs: SortedList<T>, x: T): boolean {
  return true;
  // ...
}
// You can also brand number types—for example, to attach units:
type Meters = number & { _brand: "meters" };
type Seconds = number & { _brand: "seconds" };
const meters = (m: number) => m as Meters;
const seconds = (s: number) => s as Seconds;
const oneKm = meters(1000); // Type is Meters
const oneMin = seconds(60); // Type is Seconds

// any的艺术
/**
 * Item 38: Use the Narrowest Possible Scope for any Types
 *
 * 尽可能减小any类型对类型检查的影响
 *
 */
type Bar = "b" | "a" | "r";
function expressionReturningFoo() {
  return "b";
}
function processBar(b: Bar) {
  /* ... */
}
function f0() {
  const x = expressionReturningFoo();

  // 此处由于类型检查出错报错 但是我们知道这个类型其实是正确的
  // processBar(x);
  // ~ Argument of type 'string' is not assignable to
  // parameter of type 'Bar'
  return x;
}

// 改法1：将输出设置为any 返回any
function f1() {
  const x: any = expressionReturningFoo();
  processBar(x);
  return x;
}

// 改法2：传入时局部设置为any
// 可以看出这种情况下影响的范围会更小 返回string
function f2() {
  const x = expressionReturningFoo();
  processBar(x as any);
  return x;
}

// 改法3：强制躲避类型检查 慎用
function f3() {
  const x = expressionReturningFoo();
  // @ts-ignore
  processBar(x);
  return x;
}

// 类似的
type Config = {
  a: number;
  b: number;
  c: {
    key: Bar;
  };
};
let tt: string = "abc";
// const cf1: Config = {
//   a: 1,
//   b: 2,
//   c: {
//     key: tt,
//   },
// };
// 最小影响
const cf2: Config = {
  a: 1,
  b: 2,
  c: {
    key: tt as any,
  },
};

/**
 * Item 39: Prefer More Precise Variants of any to Plain any
 *
 * 即使用any 也可以用更合适的any类型(any的wrapper选择)
 */
// 例1 输入是一个数组 但是类型未知
function getLengthBad(array: any) {
  // Don't do this!
  return array.length;
}
function getLength(array: any[]) {
  return array.length;
}
// 例2 几个特殊的function类型标识
type Fn0 = () => any; // any function callable with no params
type Fn1 = (arg: any) => any; // With one param
type FnN = (...args: any[]) => any; // With any number of params
// same as "Function" type

/**  
 * 
 * 尽量不要让func 返回类型为any 否则会大范围污染codebase
 * 如果一定要这样做，不知道返回类型 可以返回unknown
 * 
 * 考虑any类型，它可以来自于(被赋值)任何类型，同时又能赋值给任何类型(感觉是一个bug)
 * To understand the unknown type, it helps to think about any in terms of assignability.
The power and danger of any come from two properties:
• Any type is assignable to the any type.
• The any type is assignable to any other type.
In the context of “thinking of types as sets of values” (Item 7), any clearly doesn’t fit
into the type system, since a set can’t simultaneously be both a subset and a superset
of all other sets. This is the source of any’s power but also the reason it’s problematic.
Since the type checker is set-based, the use of any effectively disables it.
 * 
 * unknown type只能被赋值 而不能赋值给别的类型(universal)
 * 
 */
type Foo = string;
declare const foo: Foo;
let barAny = foo as any as Bar;
// 风险更小
let barUnk = foo as unknown as Bar;

// {}类型 consists of all values except null and undefined 等于除null和undefined外的全部类型
let y: "abc" | 123 = "abc";
let x: {} = y;
// object类型 包含所有复杂类型
// let z:object = 123;

/**
 * js中object的一个重要特性就是随时支持添加属性
 *
 * 如果我们需要在已有的interface中添加之前没有的属性 可以通过下面的方式增加
 */
// 不能保证类型
(document as any).monkey = "abc";
interface Document {
  /** Genus or species of monkey patch */
  monkey?: string;
}
document.monkey = "Tamarin"; // OK


