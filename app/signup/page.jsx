"use client"

import react,{useState} from "react";


export default function Signup(){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email,setEmail] = useState("")
    console.log(userName,password)

    
    return(
        <>
        <div className=" grid justify-items-center">
        <div className=" min-w-96 max-w-96 grid justify-items-center mt-8 border-2 border-black">
            <div className="mt-2 text-2xl underline">signup Form</div>
            <from className="">
                <div className="mt-4">
                    <lable>userName</lable>
                    <input type="text " className =" border border-black ml-2" onChange={(e)=>{setUserName(e.target.value)}}/>
                </div>
                <div className="mt-4">
                    <lable>password</lable>
                    <input type="text " className =" border border-black ml-2" onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div className="mt-4 ml-2">
                    <lable>Email</lable>
                    <input type="email" className =" border border-black ml-8"  onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
            </from>
            <button className="border-2 mt-2 mb-2 bg-black text-white border-black p-1">submit</button>
        </div>
        </div>
        </>
    )
}