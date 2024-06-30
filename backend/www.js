const http = require("http");
const environment = require("./src/database/environment");
const database = require("./src/database/database");
(async function () {
  await environment();
  await database();
  const expressApp = require("./express");
  const PORT = process.env.PORT || 6036;
  const server = http.createServer(expressApp);
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
})();

module.exports = {};
