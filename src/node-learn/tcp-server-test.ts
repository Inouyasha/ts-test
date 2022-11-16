import { createServer } from "net";

const server = createServer((socket) => {
  // 制造一个echo 将读到的数据再写一次
  // socket.pipe(socket);
  // 新的连接
  socket.on("data", function (data) {
    socket.write("你好\n");
  });

  socket.on("end", function () {
    console.log("连接断开");
  });
  socket.write("深入浅出node.js示例\n");
});

server.listen(8124, () => {
  console.log("server bound");
});
