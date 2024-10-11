import {deleteCookie} from "cookies-next";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function Nav({className}: { className?: String }) {
  const router = useRouter()
  return <nav className={"flex items-center justify-center gap-[3vw] fixed w-screen mt-[-20vh] bg-[#1d232a] w-screen " + className}>
    <Link href={"/home"} className="btn btn-ghost">Home</Link>
    <Link href={"/add"} className="btn btn-ghost">Add</Link>
    <Link href={"/profile"} className="btn btn-ghost">Profile</Link>
    <button className="btn btn-primary" onClick={() => {
      localStorage.removeItem("user")
      deleteCookie("token")
      router.push("/")
    }}>LogOut</button>
  </nav>
}
