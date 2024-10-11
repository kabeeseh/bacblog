import {User} from "@/app/api/models/User"
import {decode, verify} from "jsonwebtoken"

export async function POST(req: Request, {params}: { params: {id: String} }) {
  try {
    const authHeader = req.headers.get("Authorization")?.split(' ')[1]

    if (!authHeader || !verify(authHeader, 'secret')) return new Response("Unauthorized", { status: 500 })

    const decoded: any = await decode(authHeader)

    const user1 = await User.findById(decoded.id)
    const user2 = await User.findById(params.id)

    
    if (!user1?.following.includes(user2?.id) || !user2?.followers.includes(user1?.id)) return new Response("User not followed")
    user1?.following.pull(user2?.id)
    user2?.followers.pull(user1?.id)

    await user1?.save()
    await user2?.save()

    return new Response("Unfollowed")
  }catch(error: any) {
    return new Response(error, {status: 500})
  }
}
