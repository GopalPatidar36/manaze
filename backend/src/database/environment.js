require("dotenv");
const config = require("config");

async function environment() {
  if (process.env.ENV === "local") {
    config.DBAdminAccessSecret = {
      HOST: "localhost",
      PORT: "3306",
      SCHEMA: "",
      USERNAME: "",
      PASSWORD: "",
    };
  } else {
    config.DBAdminAccessSecret = {
      HOST: process.env.HOST,
      PORT: process.env.PORT,
      SCHEMA: process.env.SCHEMA,
      USERNAME: process.env.USERNAME,
      PASSWORD: process.env.PASSWORD,
    };
    config.PRIVATEKEY = process.env.PRIVATEKEY;
  }
}

module.exports = environment;
