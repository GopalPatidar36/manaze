const express = require("express");
const cors = require("cors");
const database = require('./src/database/database');


const PORT = process.env.PORT || 3000;

const app = express();

(async function () {
  await database();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
