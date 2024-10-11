import {hash} from "bcrypt";
import {isEmpty} from "../isEmpty";
import {User} from "../models/User"
import {sign} from "jsonwebtoken";
export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password || isEmpty([username, password])) {
      return new Response("Username And Password Required", {status: 400})
    }

    const user = await User.findOne({username})

    if (user) return new Response("Username Taken", {status: 409})

    
    const newUser = new User({
      username,
      password: await hash(password, 10)
    })

    await newUser.save()

    const token = await sign({id: newUser.id, username}, 'secret')

    return Response.json(token)
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
