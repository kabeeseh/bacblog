import {sign} from "jsonwebtoken"
import {isEmpty} from "../isEmpty"
import {User} from "../models/User"
import {compare} from "bcrypt"


export  async function POST(req: Request) {
	try {
		const { username, password } = await req.json()

		if (!username || !password || isEmpty([username, password])) {
			return new Response("Username and password required")
		}
		
		const user = await User.findOne({ username })

		if (!user) return new Response("Username Not Found", { status: 404 })
		
		if (!compare(password, user.password as string)) return new Response("Incorrect Password", { status: 400 })

		const token = sign({ id: user.id, username }, 'secret')

		return Response.json(token)
	}catch (error) {
		return new Response(error as string, {status: 500})
	}	

}
