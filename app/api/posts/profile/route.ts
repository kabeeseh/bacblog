import {decode, verify} from "jsonwebtoken"
import {NextRequest} from "next/server"
import {User} from "../../models/User"
import {Post} from "../../models/Post"

export async function GET(req: NextRequest) {
  try {
    const headers = req.headers.get("Authorization")
    const authHeader = headers?.split(' ')[1]
  
    if (!authHeader || !verify(authHeader, 'secret')) {
      return new Response("Unauthorized", { status: 401 })
    }

    const page = parseInt(req.nextUrl.searchParams.get("page") as any) || 1
    const limit = parseInt(req.nextUrl.searchParams.get("limit")as any) || 5

    const skip = (page - 1) * limit

    const decoded: any = decode(authHeader)

    console.log(decoded.id)
    const user = await User.findById(decoded?.id)
    const posts = await Post.find({ userId: { $eq: user?.id } }).populate("userId").limit(limit).skip(skip).sort({ createdAt: -1 })


    if (posts.length == 0) {
      return new Response("No More Posts", { status: 404 })
    }
    return Response.json(posts)
  }catch (error: any) {
    console.log(error)
    return new Response(error, {status: 500})
  }
}
