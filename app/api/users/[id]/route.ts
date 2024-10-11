import {verify} from "jsonwebtoken"
import {User} from "../../models/User"

export async function GET(req: Request, params: { id: string }) {
  try {

    const authHeader = req.headers.get("Authorization")?.split(' ')[1]
    if (!authHeader || !verify(authHeader, "secret")) return new Response("Unauthorized", {status: 401})

   const user = await User.findById(params.id)

   return Response.json(user)
  }catch (error: any) {
    return new Response(error, { status: 500 })
  }
}
