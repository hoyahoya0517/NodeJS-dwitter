import { MongoClient } from "mongodb";
import { config } from "../config.js";

let db;
export async function connectDB() {
  const client = new MongoClient(config.db.host);
  db = client.db();
}

export function getUsers() {
  return db.collection("users");
}

export function getTweets() {
  return db.collection("tweets");
}
