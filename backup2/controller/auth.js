import * as authRepository from "../data/auth.js";

export async function signup(req, res, next) {
  const { username, password, name, email, url } = req.body;
  const user = await authRepository.signup(
    username,
    password,
    name,
    email,
    url
  );
  if (user) {
    res.status(200).json({ username: user.username, token: user.token });
  } else res.status(401).send({ message: "회원가입 실패" });
}

export async function login(req, res, next) {
  const { username, password } = req.body;
  const user = await authRepository.login(username, password);
  if (user) {
    res.status(200).json({ username: user.username, token: user.token });
  } else res.status(401).send({ message: "로그인 실패" });
}

export async function me(req, res, next) {
  const id = req.userId;
  const user = await authRepository.findUserById(id);
  if (user) {
    res.status(200).json({ username: user.username });
  } else res.sendStatus(401);
}
