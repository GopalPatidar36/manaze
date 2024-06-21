require("./src/database/database")();
const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const isAuthorized = require("./src/middlewares/isAuthorized");

const PORT = process.env.PORT || 6036;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.all("*", isAuthorized);

app.get("/vercel", (req, res) => {
  res.send("Hello, this is the vercel endpoint!");
});

(async function () {
  const routes = fs.readdirSync(path.join(__dirname, "src/routes"), {
    encoding: "utf8",
  });
  for (const route of routes) {
    if (route.endsWith(".route.js")) {
      const [prefix] = route.split(".route.js");
      app.use(`/api/${prefix}`, require(path.join(__dirname, "src/routes", route)));
    }
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
});
