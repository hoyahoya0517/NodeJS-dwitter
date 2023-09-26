import express from "express";
import "express-async-errors";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import tweetRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(helmet());

app.use("/tweets", tweetRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});

app.listen(8080);
