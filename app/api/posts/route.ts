import {decode, verify} from "jsonwebtoken"
import {User} from "../models/User"
import {Post} from "../models/Post"
import {NextRequest} from "next/server"
import {isEmpty} from "../isEmpty"


export async function GET(req: NextRequest) {
  try {
    const headers = req.headers.get("Authorization");
    const authHeader = headers?.split(' ')[1];

    if (!authHeader || !verify(authHeader, 'secret')) {
      return new Response("Unauthorized", { status: 401 });
    }

    const page = parseInt(req.nextUrl.searchParams.get("page") as any) || 1;
    const limit = parseInt(req.nextUrl.searchParams.get("limit") as any) || 5;

    const skip = (page - 1) * limit;

    const decoded: any = decode(authHeader);
    console.log(decoded.id);
    const user = await User.findById(decoded?.id);

    const posts = await Post.find({ 
      userId: { $ne: user?.id }, 
      viewedUsers: { $nin: user?.id } 
    })
    .populate("userId")
    .limit(limit)
    .skip(skip);

    if (posts.length == 0) {
      return new Response("No More Posts", { status: 404 });

    }

    // Use Promise.all to wait for all updates to finish
    await Promise.all(posts.map(async (post) => {
      post.views += 1 as any;
      post.viewedUsers.push(decoded?.id);
      await post.save();
    }));

    return Response.json(posts);
  } catch (error: any) {
    console.log(error);
    return new Response(error.message || "Internal Server Error", { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const header = req.headers.get('Authorization')
    const authHeader = header?.split(' ')[1]

    if (!authHeader || !verify(authHeader, 'secret')) return new Response("Unauthorized", {status: 401})

    const { title, text } = await req.json()

    if (!title || !text || isEmpty([title, text])) {
      return new Response("Title and Text field required", {status: 400})
    }
    const decoded: any = await decode(authHeader)

    const post = new Post({
      title,
      text,
      userId: decoded?.id
    })

    await post.save()

    return new Response("Posted", {status: 200})
  }catch (error: any) {
    return new Response(error, { status: 500 })
  }
}

