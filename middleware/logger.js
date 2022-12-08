require("express-async-errors");
const winston = require("winston");

module.exports = function (param) {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "log/exceptions.log" })
  );
  process.on("uncaughtException", (error, source) => {
    throw error;
    //winston.error(error.message,error);
    //process.exit(1);
  });
  /*process.on('unhandledRejection',(error)=>{
        winston.error(error.message,error);
        process.exit(1);
    });*/
  winston.add(
    new winston.transports.File({
      filename: "log/combined.log",
    })
  );
};
