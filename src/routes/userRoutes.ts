import { Router } from "express"
import UserController from "../controllers/UserController.js";

const router: Router = Router();

router.post("/login", UserController.getUser)

export default router