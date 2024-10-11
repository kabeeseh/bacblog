export interface User {
  _id: String
  username: String,
  password: String,
  followers: Array<User>,
  following: Array<User>,
  posts: Array<Post>,
  createdAt: Date,
}
export interface Post {
  _id: String
  title: String,
  text: String,
  userId: User,
  likes: { type: Number, default: 0 },
  likedUsers: Array<User>,
  viewedUsers: Array<User>,
  views: Number,
  createdAt: Date
}
export interface Comment {
  _id: String
  userId: String,
  title: String,
  text: String,
  likes: Number, 
  likedUsers: Array<User>,
  createdAt: Date
}
