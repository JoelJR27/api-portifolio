import cors from "cors";
import express, { type Application } from "express";
import errorHandler from "../middlewares/errorHandler.js";
import routes from "../routes/index.js";

const app: Application = express();

app.options(/(.*)/, cors());

routes(app);


app.use(errorHandler);

export default app;
