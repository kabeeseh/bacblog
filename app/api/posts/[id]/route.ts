import {verify} from "jsonwebtoken"
import { Post } from "../../models/Post"
export async function GET(req: Request, {params}: { params: { id: string } }) {
  try {
    const authHeader = req.headers.get("Authorization")?.split(' ')[1]

    if (!authHeader || !verify(authHeader, 'secret')) return new Response("Unauthorized", { status: 401 })

    console.log(params.id)
    const post = await Post.findById(params.id)
    if (!post) return new Response("Post not found", {status: 404})

    return Response.json(post)
  }catch (error) {
    return new Response(error as string, { status: 500 })
  }
}
