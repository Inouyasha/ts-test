import { exec, execFile, fork, spawn } from "child_process";
import os from "os";

const cpus = os.cpus();
// console.log(cpus.length);
for (let i = 0; i < cpus.length; i++) {
  // 直接fork 创建的独立进程 使用独立的v8引擎 需要一定启动时间和内存
  const child = fork("dist/node-learn/worker.js");
  child.on
}

// 启动一个子进程执行命令
// spawn("node", ["D:/workspace/ts-test/dist/node-learn/master.js"]);
// 启动子进程 执行指令 可以使用回调
exec(
  "node D:/workspace/ts-test/dist/node-learn/master.js",
  function (err, stdout, stderr) {
    // some code
    console.log({ err, stdout, stderr });
  }
);
// // 启动一个子进程执行可执行文件
// execFile("dist/node-learn/worker.js", function (err, stdout, stderr) {
//   // some code
//   console.log({ err, stdout, stderr });
// });
