import mongoose from "mongoose";
import {bacblog} from "../init";

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  title: String,
  text: String,
  likes: { type: Number, default: 0 },
  likedUsers: [{
    type: mongoose.Types.ObjectId,
    ref: "User"
  }],
  createdAt: { type: Date, default: Date.now() }
})

export const Comment = bacblog.model("Comment", commentSchema)

