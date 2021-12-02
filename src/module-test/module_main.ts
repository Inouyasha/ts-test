import * as DefaultMod from "./default-export";
import { Module1 as Mod1 } from "./module-1";
import * as MultiMod from "./multipule-export";

let mod1 = new Mod1();
mod1.print();

let multiMod1 = new MultiMod.MultipleClass1();
let multiMod2 = new MultiMod.MultipleClass2();
console.log(multiMod1.a, multiMod2.a);

// 以default被导出
let modDefault = DefaultMod.default(1, 2);