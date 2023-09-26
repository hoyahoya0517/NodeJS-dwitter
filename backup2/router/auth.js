import express from "express";
import "express-async-errors";
import * as authController from "../controller/auth.js";
import { validate } from "../middleware/validator.js";
import { body } from "express-validator";
import { validateCookie } from "../middleware/auth.js";

const router = express.Router();

const validateLogin = [
  body("username").trim().notEmpty().withMessage("제대로 입력하세요"),
  body("password").trim().notEmpty().withMessage("제대로 입력하세요"),
  validate,
];

const validateSignUp = [
  body("name").trim().notEmpty().withMessage("제대로 입력하세요"),
  body("email").isEmail().withMessage("이메일을 제대로 입력하세요"),
  body("url").trim().isURL().withMessage("링크를 제대로 입력하세요"),
  ...validateLogin,
];

router.post("/signup", validateSignUp, authController.signup);
router.post("/login", validateLogin, authController.login);
router.get("/me", validateCookie, authController.me);

export default router;
