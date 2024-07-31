"use client"


import react,{useState, useEffect} from "react";
import { useRouter } from 'next/navigation'
import { useToken } from "./context/TokenContext";




export default function Login(){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    //const [token2, setToken2] = useState("");
    const router = useRouter();
    const { token, setToken } = useToken();
    

    useEffect(()=>{
        if (token) {
            router.push("/root");
        }
    },[token])




   
    
    

    async function submitLogin(){
       // console.log("submit ckicked")
        const res = await fetch("http://localhost:5000/api",{
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username : userName,
                password : password,
            }),
          })

          const data = await res.json()
          console.log(data.acessToken)
          setToken(data.acessToken)
        //   setToken2(token)
        //   console.log(token)  
    }

    
    return(
        <div className=" grid justify-items-center">
        <div className=" min-w-96 max-w-96 min-h-96 max-h-96 grid justify-items-center mt-24 border-2  border-[#333333] shadow-2xl  shadow-[#1E1E1E]">
            <div className=" text-3xl  mt-12  font-bold">Login Form</div>
                <form className="">
                    <div className="">
                        <label>Username</label>
                        <br></br>                  
                        <input type="text " className =" border-[#9A9994] outline-none bg-[#333333] border-b-2 w-64"  onChange={(e)=>{setUserName(e.target.value)}}/>
                    </div>
                    <div className="mt-4">
                        <label>password</label>
                        <br></br> 
                        <input type="text " className ="  border-[#9A9994] outline-none bg-[#333333] border-b-2 w-64 " onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                </form>
                <button className="border-2 border-[#9A9994] hover:bg-[#3c3c3c] w-32 h-12 mt-[-2] text-M" onClick={(e)=>{submitLogin()}}>SUBMIT</button>
            
            </div>
        </div>
    )
}


