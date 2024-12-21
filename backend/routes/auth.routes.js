import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import {
  forgotPassword,
  resetPasswordGet,
  resetPasswordPost,
} from "../controllers/resetPassword.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);
// router.get("/:id/:token", resetPasswordGet);
// router.post("/:id/:token", resetPasswordPost);

export default router;
