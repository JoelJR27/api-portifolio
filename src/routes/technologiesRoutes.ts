import { Router } from "express"
import TechnologiesController from "../controllers/TechnologiesController.js";

const router: Router = Router();

router.get("/", TechnologiesController.getAll)
router.get("/:id", TechnologiesController.getById)
router.post("/", TechnologiesController.create)
router.put("/:id", TechnologiesController.update)
router.delete("/:id", TechnologiesController.delete)

export default router