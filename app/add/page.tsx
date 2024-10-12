'use client'
import axios from "axios"
import {getCookie} from "cookies-next"
import {useRouter} from "next/navigation"
import {useRef, useState} from "react"
import {Loading} from "../components/loadingComp"
import Nav from "../components/Nav"
import {Error} from "../components/Error"

export default function Add() {
  const title = useRef<HTMLInputElement>(null)
  const text = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  return <>
    <Nav className={"mt-[0vh]"} />
    {loading ? <Loading /> :
    <form className="flex flex-col gap-[3vh] items-center justify-center h-screen" onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        await axios.post("/api/posts", {
          title: title.current?.value,
          text: text.current?.value
        }, {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`
          }
        }).then(() => {
          alert("Post Added!")
          router.push("/profile")
        }).finally(() => {
          setLoading(false)
        })
      }}>
      {error && <Error error={error} />}
      <input type="text" placeholder="Title" ref={title} className="input input-bordered" />
      <input type="text" placeholder="Text" ref={text} className="input input-bordered" />
      <button className="btn btn-primary">Add</button>
    </form>
    }
  </>
}
