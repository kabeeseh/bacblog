'use client'
import {Error} from "@/app/components/Error";
import {Post} from "@/app/types";
import axios from "axios";
import {getCookie} from "cookies-next";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function PostComp({ params }: { params: { id: String } }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [post, setPost] = useState<Post>()

  console.log(params.id)
  const fetchPost = async () => {
    setLoading(true)
    setError("")
    await axios.get(`/api/posts/${params.id}`, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`
      }
    }).then((res) => {
      setPost(res.data)
    }).catch((err) => {
      setError(err.response.data)
    }).finally(() => setLoading(false))
  }
  useEffect(() => {
    fetchPost()
  }, [])

  return <>
    {error ? <Error error={error} /> : null}
    <h1>{post?.title}</h1>
  </>
}

