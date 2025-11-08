import express, { type Application, type Request, type Response } from "express";
import errorHandler from "../middlewares/errorHandler.js";
import routes from "../routes/index.js";

const app: Application = express();

routes(app);

app.use(errorHandler);

export default app;
