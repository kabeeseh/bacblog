import {decode, verify} from "jsonwebtoken";
import {NextRequest} from "next/server";
import {Post} from "../../../models/Post";
import {User} from "../../../models/User";

export async function GET(req: NextRequest, {params}: { params: { id: String } }) {
  try {
    const header = req.headers.get("Authorization")
    const authHeader = header?.split(' ')[1]
    
    if (!authHeader || !verify(authHeader, 'secret')) return new Response("Unauthorized", {status: 401})


    console.log(params.id)
    const id = params.id
    const decoded:any = await decode(authHeader)

    const post = await Post.findById(params.id)
    const user = await User.findById(decoded.id)

    if (!post) {return new Response("Post not found", {status: 404})}

    if (post.likedUsers.includes(user?.id)) return new Response("User already liked post", { status: 409 })

    post.likes += 1 as any
    post.likedUsers.push(user?.id)

    await post.save();

    return new Response("Post Liked")

  }catch (error: any) {
    return new Response(error, {status: 500})
  }
}
