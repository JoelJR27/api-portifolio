import { Router } from "express"
import ProjectsController from "../controllers/ProjectsController.js"

const router: Router = Router()

router.get("/projects", ProjectsController.getAll)
router.get("/projects/:slug", ProjectsController.getBySlug)
router.post("/projects", ProjectsController.create)
router.put("/projects/:slug", ProjectsController.update)
router.delete("/projects/:slug", ProjectsController.delete)

export default router