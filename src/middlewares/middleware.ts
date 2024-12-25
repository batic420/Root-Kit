import express from "express";
import cors from "cors";
import helmet from "helmet";

const commonMiddleware = (app: express.Application) => {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

export default commonMiddleware;
