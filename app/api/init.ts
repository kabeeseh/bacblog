import mongoose from "mongoose";

mongoose.connect("mongodb+srv://kabees:2011@book-db.skdoenm.mongodb.net/?retryWrites=true&w=majority&appName=book-db")


export const bacblog = mongoose.connection.useDb("bacblog")
