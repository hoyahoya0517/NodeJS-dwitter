import * as tweetRepository from "../data/tweet.js";

export async function getTweets(req, res) {
  const username = req.query.username;
  const data = await (username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll());
  if (data) res.status(200).json(data);
  else res.sendStatus(404);
}

export async function getTweet(req, res, next) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export async function createTweet(req, res, next) {
  const { text } = req.body;
  const userId = req.userId;
  const tweet = await tweetRepository.create(text, userId);
  res.status(201).json(tweet);
}

export async function updateTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const userId = req.userId;
  const tweet = await tweetRepository.update(id, text, userId);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet id error` });
  }
}

export async function deleteTweet(req, res, next) {
  const id = req.params.id;
  const userId = req.userId;
  const check = await tweetRepository.remove(id, userId);
  if (check) res.sendStatus(403);
  else res.sendStatus(204);
}
