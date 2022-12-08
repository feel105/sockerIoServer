const express = require("express");
const app = express();
const server = require("http").createServer(app);
app.io = require("socket.io")(server, { cors: { origin: "*" } }); //for cors Domain
app.set("socketio", app.io);
require("./middleware/logger")();
require("./startup/routes")(app);

const port = process.env.port || 3000;
//app.listen(port, () => console.log(`Listing Port ${port}`));
server.listen(port, () => {
  console.log(`server listing on ${port}`);
});
module.exports = server;
