"use client"
import { useToken } from "./context/TokenContext";
import Link from "next/link"

export default function Navbar(){
    const { token, setToken } = useToken();
    return(
        <div className = "border-2 h-20 border-[#333333]  bg-[#333333]  shadow-xl shadow-[#1D1D1D] ">
            <div className=" flex float-right  my-5" >
                <div className="mr-8 font-bold text-xl hover:text-black"><Link href="/">Signin</Link></div>
                <div className="mr-8 font-bold text-xl hover:text-black"><Link href="/signup">Signup</Link></div>
                <div className="mr-8 font-bold text-xl hover:text-black" onClick={(e)=>{setToken(null)}}><Link href="/">Logout</Link></div>
                {/* <div><Link href="root">root</Link></div> */}
            </div>
            
        </div>
    )
}
