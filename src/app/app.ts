import cors from "cors";
import express, { type Application } from "express";
import errorHandler from "../middlewares/errorHandler.js";
import routes from "../routes/index.js";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(cookieParser(), cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
},));

routes(app);

app.use(errorHandler);

export default app;
