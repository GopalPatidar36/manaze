const environment = require("./src/database/environment");
const database = require("./src/database/database");
(async function () {
  await environment();
  await database();
  require("./express");
})();

module.exports;
