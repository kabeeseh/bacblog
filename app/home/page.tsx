'use client'
import {useContext, useEffect, useState} from "react"
import axios from "axios"
import {getCookie} from "cookies-next"
import {Post} from "../types"
import InfiniteScroll from "react-infinite-scroll-component"
import {Loading} from "../components/loadingComp"
import {Error} from "../components/Error"
import {UserContext} from "../contexts/UserProvider"
import Nav from "../components/Nav"
export default function Home() {
  const { user } = useContext(UserContext)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<String>("")
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const fetchPosts = async () => {
    setLoading(true)
    await axios.get(`/api/posts?page=1&limit=5`, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      }
    }).then((res) => {
      setPosts((prev) => [...prev, ...res.data])
      console.log(posts)
      console.log(res.data)
    }).catch((err) => {
      setError(err.response.data)
      setHasMore(false)
    }).finally(() => {
      setLoading(false)
      setPage((prev) => prev + 1)
    })
  }
  useEffect(() => {
    console.log(user?.username)
    fetchPosts()
    }, [])
  const handleLike = async (postId: String) => {
      
setPosts((prev) =>
  prev.map((post: any) =>
    post._id === postId
      ? {
          ...post,
          likes: post.likes + 1,
          likedUsers: user ? [...post.likedUsers, user._id] : post.likedUsers, // Ensure user is defined
        }
      : post
  )
);
    await axios.get(`/api/posts/like/${postId}`, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`
      }
    }) 
  }
const handleDislike = async (postId: String) => {
    setPosts((prev) =>
      prev.map((post: any) => 
  post._id === postId ? { ...post, likes: post.likes - 1, likedUsers:post.likedUsers.filter((p: any) => p !== user?._id)  } : post
      )
    );
    await axios.get(`/api/posts/dislike/${postId}`, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`
      }
    }) 
  }
  return <>
    <Nav />
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchPosts}
      hasMore={hasMore}
      loader={<Loading />}
      endMessage={<Error error={error}/>}
      className="flex flex-col items-center mt-[30vh]"
    >
    {posts.map((post) => <div key={post._id as string} className="border border-solid w-fit h-fit p-[5vw] text-center">

      <h1>Username: {post.userId.username}</h1>
      <h1>Title: {post.title}</h1>
      <h1>Text: {post.text}</h1>
      <h1>Likes: {post.likes as any}</h1>
      {post.likedUsers.includes(user?._id as any) ? <button onClick={() => handleDislike(post._id)} className="btn btn-primary">Dislike</button> :
      <button onClick={() => handleLike(post._id)} className="btn btn-primary">Like</button>
      }
    </div>)}
    </InfiniteScroll> 
  </>
}
