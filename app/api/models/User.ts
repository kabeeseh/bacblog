import mongoose from "mongoose";
import {bacblog} from "../init";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  followers: [{
    type: mongoose.Types.ObjectId,
    ref: "User"
  }],
  following: [{
    type: mongoose.Types.ObjectId,
    ref: "User"
  }],
  posts: [{
    type: mongoose.Types.ObjectId,
    ref: "Post"
  }],
  createdAt: {type: Date, default: Date.now()},
})

export const User = bacblog.model("User", userSchema)
