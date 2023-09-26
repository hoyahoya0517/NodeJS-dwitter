import { ObjectId } from "mongodb";
import { getUsers } from "../database/database.js";

export async function findByUsername(username) {
  return getUsers()
    .findOne({ username })
    .then((data) => mapOptionalUser(data));
}

export async function findById(id) {
  return getUsers()
    .findOne({ _id: new ObjectId(id) })
    .then((data) => mapOptionalUser(data));
}

export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((data) => data.insertedId.toString());
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
