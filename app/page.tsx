import Link from "next/link";

export default function App() {
  return <div className="flex items-center justify-center h-[100vh] gap-[5vw]">
    <Link href={"/login"} className="btn btn-primary text-[1.2rem] btn-wide">LogIn</Link>
    <Link href={"/signup"} className="btn btn-primary text-[1.2rem] btn-wide">SignUp</Link>
    </div>
}
