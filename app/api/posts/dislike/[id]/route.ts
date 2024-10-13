import {decode, verify, JwtPayload} from "jsonwebtoken";
import {NextRequest} from "next/server";
import {Post} from "../../../models/Post";
import {User} from "../../../models/User";

export async function GET(req: NextRequest, {params}: { params: { id: string } }) {
  try {
    const header = req.headers.get("Authorization")
    const authHeader = header?.split(' ')[1]
    
    if (!authHeader || !verify(authHeader, 'secret')) return new Response("Unauthorized", {status: 401})


    console.log(params.id)
    const id: string = params.id
    const decoded = await decode(authHeader) as JwtPayload | null;

    const post = await Post.findById(params.id)
    const user = await User.findById(decoded?.id as any)

    if (!post) {return new Response("Post not found", {status: 404})}

    if (!post.likedUsers.includes(user?.id)) return new Response("User didnt like this post", { status: 409 })

    let likes:any = post.likes;
    likes -= 1;
    post.likes = likes
    post.likedUsers.pull(user?.id)

    await post.save();

    return new Response("Post Disliked")

  }catch (error: any) {
    return new Response(error, {status: 500})
  }
}
