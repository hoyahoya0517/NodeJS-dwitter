import express from "express";
import "express-async-errors";
import * as tweetController from "../controller/tweet.js";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import { validateCookie } from "../middleware/auth.js";
const router = express.Router();

const validateTweet = [
  body("text").trim().isLength({ min: 3 }).withMessage("3글자 이상 적어주세요"),
  validate,
];
// GET /tweets
// GET /tweets?username=:username
router.get("/", tweetController.getTweets);

// GET /tweets/:id
router.get("/:id", validateCookie, tweetController.getTweet);

// POST /tweeets
router.post("/", validateCookie, validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put("/:id", validateCookie, validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete("/:id", validateCookie, tweetController.deleteTweet);

export default router;
