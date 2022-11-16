import { connect } from "net";

const client = connect({ port: 8124, host: "127.0.0.1" }, () => {
  console.log("client connected");
  client.write("world!\r\n");
});
client.on("data", function (data) {
  console.log(data.toString());
  // client.end();
});
client.on("end", function () {
  console.log("client disconnected");
});
