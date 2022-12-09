const express = require("express");
const app = express();
const server = require("http").createServer(app);
const net = require("net");

app.io = require("socket.io")(server, { cors: { origin: "*" } }); //for cors Domain
app.set("socketio", app.io);

require("./middleware/logger")();
require("./startup/routes")(app);

// var c = net.createConnection(9000, "127.0.0.1");
// c.on("connect", function () {
//   let msg = "lightOn";
//   c.write(msg);
// });
// c.on("data", (data) => {
//   console.log(data.toString());
// });

// var client = new net.Socket();
// client.connect(9000, "127.0.0.1", function () {
//   console.log("Connected"); // acknowledge socket connection
//   client.write("Hello, server! Love, Client."); // send info to Server
// });
// client.on("data", function (data) {
//   console.log("Received: " + data); // display info received from server
//   client.destroy(); // kill client after server's response
// });

// client.on("close", function () {
//   console.log("Connection closed");
// });

const port = process.env.port || 3000;
//app.listen(port, () => console.log(`Listing Port ${port}`));
server.listen(port, () => {
  console.log(`server listing on ${port}`);
});
/*const netServer = net.createServer((c) => {
  // 'connection' listener.
  console.log("client connected");
  c.on("end", () => {
    console.log("client disconnected");
  });
  c.write("hello\r\n");
  c.pipe(c);
});
server.on("error", (err) => {
  throw err;
});
netServer.listen(6000, () => {
  console.log("server bound");
}); */
//https://stackoverflow.com/questions/43654357/node-js-click-button-and-send-something-with-tcp-ip-protocol
var netServer = net.createServer();
netServer.listen(6000, "127.0.0.1");
const socket = require("./startup/socket")(netServer);
app.get("/socket/connection", socket.connection);

module.exports = server;
