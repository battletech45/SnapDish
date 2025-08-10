import { Router } from "express";
import { googleLogin } from "../controller/authController";

const router = Router();

router.post("/googleLogin", googleLogin);

export default router;
