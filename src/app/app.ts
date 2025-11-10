import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Application } from "express";
import errorHandler from "../middlewares/errorHandler.js";
import routes from "../routes/index.js";

const app: Application = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://portifolio-joel-junior.vercel.app/",
      // Adicionar produção aqui
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

routes(app);


app.use(errorHandler);

export default app;
