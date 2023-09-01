const monoose = require("mongoose");
const config = require("config");

module.exports = function () {
  monoose
    .connect(config.get("dbConnectURL"))
    .then(() => {
      console.log("db connection sucsess");
    })
    .catch((err) => {
      console.log(err);
    });
};