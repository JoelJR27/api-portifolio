import express, { type Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import projects from "./projectsRoutes.js"
import experiences from "./experiencesRoutes.js"
import user from "./userRoutes.js"
import techonologies from "./technologiesRoutes.js"

export default function routes(app: Application) {
    app.use(express.json(), cookieParser(), cors({
        origin: "http://localhost:3001",
        credentials: true
    }), projects, experiences, user, techonologies)
}
