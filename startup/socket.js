const net = require("net");

module.exports = function (server) {
  module.connection = function (request, response) {
    server.on("connection", function (socket) {
      console.log(
        "CONNECTED: " + socket.remoteAddress + ":" + socket.remotePort
      );
      socket.write("Hello from server");
      // other stuff is the same from here
      socket.on("data", function (data) {
        socket.write("reply data " + data);
      });
    });
  };
  return module;
};
