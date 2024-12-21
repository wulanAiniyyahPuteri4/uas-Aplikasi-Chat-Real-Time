import express from "express";
import {
  forgotPassword,
  resetPasswordGet,
  resetPasswordPost,
} from "../controllers/resetPassword.controller.js";

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.get("/:id/:token", resetPasswordGet);
router.post("/:id/:token", resetPasswordPost);

export default router;
