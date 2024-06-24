// import environment from "./src-ts/database/environment.ts";
import { database } from "./src-ts/database/database";
("./src-ts/custom.d");
(async function () {
  // await environment();
  await database();
  await import("./express-ts"); // Adjust the path as necessary
})();
