import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import commonMiddleware from "./middlewares/middleware";
import routes from "./routes/routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
commonMiddleware(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/", routes);
