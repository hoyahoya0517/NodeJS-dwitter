import jwt from "jsonwebtoken";
import { findUserByUserName } from "../data/auth.js";

const secretKey = "123123123123";

const checkToken = async (token) => {
  return jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return fasle;
    else return decoded;
  });
};

export async function validateCookie(req, res, next) {
  const token = req.cookies.token;
  if (!token) res.sendStatus(403);
  const userToken = await checkToken(token);
  if (!userToken) res.sendStatus(403);
  const user = await findUserByUserName(userToken.username);
  if (!user) res.sendStatus(403);
  req.userId = user.id;
  next();
}
