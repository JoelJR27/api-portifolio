import { Router } from "express"
import UserController from "../controllers/UserController.js";

const router: Router = Router();

router.post("/", UserController.getUser)

export default router