"use client"
import axios from "axios"
import { getCookie, setCookie } from "cookies-next"
import {useContext, useRef, useState} from "react"
import { Error } from "../components/Error"
import {Loading} from "../components/loadingComp"
import {useRouter} from "next/navigation"
import {UserContext} from "../contexts/UserProvider"
export default function Login() {
  const { setUser } = useContext(UserContext)
  const [loading, setLoading] = useState<boolean>(false) 
  const [error, setError] = useState<String>("")
  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const router = useRouter()
  return loading ? <Loading /> : <form className="flex flex-col items-center justify-center h-screen gap-[3vh]" onSubmit={async (e) => {
      e.preventDefault()
      setLoading(true)
      setError("")
      await axios.post("/api/login", {
        username: username.current?.value,
        password: password.current?.value
      }).then(async (res) => { 
        await axios.get("/api/users", { headers: {
          Authorization: `Bearer ${res.data}`
        } }).then((res2) => {
          setUser(res2.data)
          setCookie("token", res.data)
          router.push("/home")
        })
      }).catch((error) => {
        setError(error.response.data)
      }).finally(() => setLoading(false))
    }}>
    <Error error={error} />
    <input type="text" placeholder="Username" ref={username} className="input input-bordered" />
    <input type="password" placeholder="Password" ref={password} className="input input-bordered"/>
    <button className="btn btn-primary">LogIn</button>
  </form>
}
