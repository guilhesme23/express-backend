import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";

dotenv.config();

const { PORT, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;

const buildApp = (): express.Application => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(fileUpload());
  app.use(router);

  return app;
};

const run = async (app: express.Application) => {
  await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    user: DB_USER,
    pass: DB_PASS,
    authSource: "admin"
  });
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
};

run(buildApp());
