import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import commonMiddleware from "./middlewares/middleware";
import routes from "./routes/routes";
import { dbConfig } from "./config/database";
import { AppDataSource } from "./config/appDataSource";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const db = dbConfig.init();
commonMiddleware(app);

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    
    app.use("/", routes);
  })
  .catch((err) => {
    console.log(err);
  });

