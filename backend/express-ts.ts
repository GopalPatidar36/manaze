import express, { Express, Request, Response, NextFunction, Errback } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import { isAuthorized } from "./src-ts/middlewares/isAuthorized";

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

app.get("/vercel", (req: Request, res: Response) => {
  res.send("Hello, this is the vercel endpoint!");
});

(async function () {
  const routes = fs.readdirSync(path.join(__dirname, "src-ts/routes"), {
    encoding: "utf8",
  });
  for (const route of routes) {
    if (route.endsWith(".route.ts")) {
      const [prefix] = route.split(".route.ts");
      app.use(`/api/${prefix}`, require(path.join(__dirname, "src-ts/routes", route)));
    }
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
});
