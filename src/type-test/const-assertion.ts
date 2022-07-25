// const assertion 主要可以将声明中的所有变量固定
const dave1 = {
  name: "dave1",
  role: "admin",
  skills: ["eat", "kill"],
};
dave1.name = "dave1";
dave1.skills.push("drink");

// 全固定
// 这种限制的行为仅发生在typescript的静态编译中 而非js中 查看其类型可以看到
const dave2 = {
  name: "dave2",
  role: "admin",
  skills: ["eat", "kill"],
} as const;
// 报错
// dave2.name = "dave2";
// dave2.skills.push("drink");

// 用途
const exampleStr1 = { side: "left" };
const exampleStr2 = { side: "left" as const };
function changeSide(side: "left" | "right") {
  return side;
}
// 画红线 因为这时类型是string
// changeSide(exampleStr1.side);
changeSide(exampleStr2.side);
