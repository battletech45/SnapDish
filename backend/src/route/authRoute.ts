import { Router } from "express";
import { emailLogin, googleLogin } from "../controller/authController";

const router = Router();

router.post("/googleLogin", googleLogin);
router.post("/emailLogin", emailLogin);

export default router;
