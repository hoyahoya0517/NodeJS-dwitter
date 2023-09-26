import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

let auth = [
  {
    id: "1",
    username: "sakao34",
    password: "$2b$10$W7ubDmrq5Bc9mUaBsALwJ.W2WzUXeGcsTtp.IXO0tUJkESjzJG602",
    name: "Gunho",
    email: "hoyahoya0517@naver.com",
    url: "https://res.cloudinary.com/hoyahoya/image/upload/v1694054107/2023fw/3d63615ef5594_atozbp_wsrvrv.jpg",
  },
  {
    id: "2",
    username: "ellie",
    password: "123",
    name: "Ellie",
    email: "ellie@naver.com",
    url: "https://res.cloudinary.com/hoyahoya/image/upload/v1694054107/2023fw/3d63615ef5594_atozbp_wsrvrv.jpg",
  },
];

const secretKey = "123123123123";

const createToken = (username) => {
  const token = jwt.sign({ username }, secretKey, { expiresIn: "2h" });
  return token;
};
const checkToken = async (token) => {
  return jwt.verify(token, secretKey);
};

const createPassword = async (password) => {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
};
const checkPassword = async (password, hashPw) => {
  const result = bcrypt.compareSync(password, hashPw);
  return result;
};
export async function signup(username, password, name, email, url) {
  const check = auth.find((user) => user.username === username);
  if (check) return false;
  const newPassword = await createPassword(password);
  const user = {
    id: Date.now().toString(),
    username,
    password: newPassword,
    name,
    email,
    url,
  };
  auth = [...auth, user];
  const token = createToken(username);
  console.log(auth);
  return { username, token };
}

export async function login(username, password) {
  const user = auth.find((user) => user.username === username);
  if (!user) return false;
  const hash = user.password;
  const checkPw = await checkPassword(password, hash);
  if (user && checkPw) {
    const token = createToken(user.username);
    return { username: user.username, token };
  } else return null;
}

export async function findUserById(id) {
  return auth.find((user) => user.id === id);
}

export async function findUserByUserName(username) {
  return auth.find((user) => user.username === username);
}
