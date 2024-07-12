import express, { Express } from "express";
import { createHandler } from "graphql-http/lib/use/express";

import bodyParser from "body-parser";
import cors from "cors";
import { isAuthorized } from "./src-ts/middlewares/isAuthorized";

import PrivateSchema from "./src-ts/GQLSchema/private";
import PublicSchema from "./src-ts/GQLSchema/public";

declare global {
  namespace Express {
    interface Request {
      session: { uid: string; userId: string };
    }
  }
}

const PORT: String | Number = process.env.PORT || 6036;
const app: Express = express();
app.use(cors());
app.use(bodyParser.json());

app.all("*", isAuthorized);

app.all("/public", createHandler({ schema: PublicSchema }));

app.all("/api", (req, res, next) => {
  const handler = createHandler({ schema: PrivateSchema, rootValue: { session: req.session } });
  return handler(req, res, next);
});
(async function () {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
