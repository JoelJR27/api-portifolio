import { Router } from "express"
import ProjectsController from "../controllers/ProjectsController.js"

const router: Router = Router()

router.get("/", ProjectsController.getAll)
router.get("/:slug", ProjectsController.getBySlug)
router.post("/", ProjectsController.create)
router.put("/:slug", ProjectsController.update)
router.delete("/:slug", ProjectsController.delete)

export default router