const express = require("express");
const error = require("../middleware/error");
module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));

  const realRoute = require("../routes/messages")(app.io);
  app.use("/", realRoute);

  // null route
  app.get("/", (req, res) => {
    console.log("null route");
  });

  //Default route no routes found
  app.get("*", (req, res) => {
    console.log("404 not found!");
  });
  app.use(error);
};
