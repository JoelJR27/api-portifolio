import { type Application } from "express";
import projects from "./projectsRoutes.js"
import experiences from "./experiencesRoutes.js"
import user from "./userRoutes.js"
import techonologies from "./technologiesRoutes.js"

export default function routes(app: Application) {
    app.use(projects, experiences, user, techonologies)
}
