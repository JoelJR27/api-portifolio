import { Router } from "express"
import TechnologiesController from "../controllers/TechnologiesController.js";

const router: Router = Router();

router.get("/technologies", TechnologiesController.getAll)
router.get("/technologies/:id", TechnologiesController.getById)
router.post("/technologies", TechnologiesController.create)
router.put("/technologies/:id", TechnologiesController.update)
router.delete("/technologies/:id", TechnologiesController.delete)

export default router