const express = require("express");
const router = express.Router();

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("open connection socket ");
    socket.on("allMessage", async () => {
      sendAllNews();
    });
    //send status to all Connected User
    const sendAllNews = async (data) => {
      io.emit("allNews", data); //io emit send to all user
    };
    socket.on("changeStatus", async (values) => {
      console.log("changeStatus", values);
      sendAllNews({ status: values });
    });
    io.emit("init", { status: "off" });
    console.log(`Socket ${socket.id} has connected`);
  });
  return router;
};
