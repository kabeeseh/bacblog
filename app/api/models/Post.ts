import mongoose from "mongoose";
import {bacblog} from "../init";
import { User } from "./User";
const postSchema = new mongoose.Schema({ 
  title: String,
  text: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  likes: { type: Number, default: 0 },
  likedUsers: [{
    type: mongoose.Types.ObjectId,
    ref: "User"
  }],
  viewedUsers: [{
    type: mongoose.Types.ObjectId,
    ref: "User"
  }],
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now() }
})

export const Post = bacblog.model("Post", postSchema)


