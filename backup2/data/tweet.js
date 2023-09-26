import { findUserById, findUserByUserName } from "./auth.js";

let tweets = [
  {
    id: "1",
    text: "드림코더분들 화이팅!",
    createdAt: new Date(),
    userId: "2",
  },
  {
    id: "2",
    text: "안뇽!",
    createdAt: new Date(),
    userId: "1",
  },
];

export async function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, email, url } = await findUserById(tweet.userId);
      return { ...tweet, username, name, email, url };
    })
  );
}

export async function getAllByUsername(username) {
  const user = await findUserByUserName(username);
  if (!user) return;
  return tweets
    .filter((tweet) => tweet.userId === user.id)
    .map((tweet) => {
      return {
        ...tweet,
        username: user.username,
        name: user.name,
        email: user.email,
        url: user.url,
      };
    });
}

export async function getById(id) {
  return tweets.find((tweet) => tweet.id === id);
}

export async function create(text, userId) {
  const user = await findUserById(userId);
  if (!user) return;
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return {
    ...tweet,
    username: user.username,
    name: user.name,
    email: user.email,
    url: user.url,
  };
}

export async function update(id, text, userId) {
  const user = await findUserById(userId);
  if (!user) return;
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet.userId !== userId) return;
  if (tweet) {
    tweet.text = text;
  }
  return {
    ...tweet,
    username: user.username,
    name: user.name,
    email: user.email,
    url: user.url,
  };
}

export async function remove(id, userId) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet.userId !== userId) return true;
  else tweets = tweets.filter((tweet) => tweet.id !== id);
}
