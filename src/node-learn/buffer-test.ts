// const str = "深入浅出node.js";
// const encoding = "utf8";
// const buf = Buffer.from(str, encoding);
// console.log(buf);
// console.log(buf.length);

import { createReadStream } from "fs";

// console.log(buf.toString(encoding));
// const fs = require("fs");
const rs = createReadStream("src/node-learn/assets/test.md", {
  // 设置为11后 会将buffer截断为7次处理
  highWaterMark: 11,
});
// rs.setEncoding('utf8');
let data = "";
rs.on("data", function (chunk: Buffer) {
  console.log(chunk, chunk.toString());
  // data = data.toString()+chunk.toString();
  data += chunk;
});
rs.on("end", function () {
  console.log(data);
});

const res = createReadStream("src/node-learn/assets/test.md", {
  // 设置为11后 会将buffer截断为7次处理
  highWaterMark: 11,
});
// 正确处理方案
const chunks: Buffer[] = [];
let size = 0;
res.on("data", function (chunk: Buffer) {
  chunks.push(chunk);
  size += chunk.length;
});
res.on("end", function () {
  // 拼接buffer 然后总的转码
  const buf = Buffer.concat(chunks, size);
  const str = buf.toString("utf8");
  console.log(str);
});
