import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { loginValidation, registerValidation, validate } from "../middleware/validators.js";

const router = express.Router();

router.post("/register", validate(registerValidation), register);
router.post("/login", validate(loginValidation), login);

export default router;
