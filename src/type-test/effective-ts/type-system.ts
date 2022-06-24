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
document.querySelector("#myButton").addEventListener("click", (e) => {
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

