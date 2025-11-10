import { Router } from "express";
import ExperiencesController from "../controllers/ExperiencesController.js";

const router: Router = Router()

router.get("/", ExperiencesController.getAll);
router.post("/", ExperiencesController.create);
router.put("/:id", ExperiencesController.update);
router.delete("/:id", ExperiencesController.delete);

export default router