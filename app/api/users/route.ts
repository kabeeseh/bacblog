import {decode, verify} from "jsonwebtoken"
import {User} from "../models/User"

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization")?.split(' ')[1]

    if (!authHeader || !verify(authHeader, 'secret')) return new Response("Unauthorized", {status: 401})

    const decoded: any = await decode(authHeader)

    const user = await User.findById(decoded.id)

    return Response.json(user)
  }catch (error: any) {
    return new Response(error, { status: 500 })
  }
}
