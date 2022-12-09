const express = require("express");
const router = express.Router();
const net = require("net");
var client = new net.Socket();

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("open connection socket ");
    socket.on("receiveGeneralMessage", async () => {
      //sendToAllClient();
    });
    //send status to all Connected User
    const sendToAllClient = async (data) => {
      io.emit(data.state, data); //io emit send to all user
    };
    socket.on("changeStatus", async (values) => {
      console.log("changeStatus", values);
      //sendToAllClient({state: "connection",status: true,message: "open",light: "off",});
      client.write("pleseonlight"); // send info to Server
    });
    io.emit("init", { status: "off" });

    socket.on("openConnection", async () => {
      console.log("openConnection call ");
      client.connect(9000, "127.0.0.1", function () {
        console.log("Connected"); // acknowledge socket connection
        sendToAllClient({
          state: "connectionState",
          status: true,
          message: "open",
          light: "off",
        });
      });
    });

    console.log(`Socket ${socket.id} has connected`);

    client.on("data", function (data) {
      console.log("Received: " + data); // display info received from server
      sendToAllClient({
        state: "lightState",
        status: true,
        message: "lightonoff",
        light: "lightStatus",
      });
      client.destroy(); // kill client after server's response
    });
    client.on("close", function () {
      console.log("Connection closed");
    });
  });
  return router;
};
