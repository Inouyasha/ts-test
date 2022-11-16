import { createSocket } from "dgram";
const message = Buffer.from("深入浅出Node.js");
const client = createSocket("udp4");
// message即使为字符串 也会转为buffer形式发送
client.send(message, 0, message.length, 41234, "localhost", (err, bytes) => {
  client.close();
});
