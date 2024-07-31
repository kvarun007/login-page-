"use client"
import { useToken } from "../context/TokenContext";
import react,{useState, useEffect} from "react";

export default function Root(){
    const { token, setToken } = useToken();
    const [rawData, setRawData] = useState([]);
    const [del, setDel] = useState("")
    

    useEffect(()=>{userType()},[])

    // useEffect(()=>{console.log("updated")},[del])

    async function deleteUser(x){
        try{
            const res = await fetch("http://localhost:5000/api/del",{
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username : x
                }),
            })
            const data = await res.json()
            console.log(data)
            setDel(data.message)
            console.log(del)
            userType()
        }catch{
            console.log(err)
        }
    }

    

    async function userType(){
        try{
            const res = await fetch("http://localhost:5000/api/root",{
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token : token
                }),
              })
    
              const data = await res.json()
              console.log(data)
              setRawData(data)
            //   console.log(rawData)
            //   console.log(typeof rawData)
        }catch(err){
            console.log(err)
        }
    }
    return(
        <>
        <div className="border border-[#333333] shadow-2xl rounded-lg shadow-[#1E1E1E] w-96 mx-auto mt-12 min-h-64">
        
        <div className="border-b h-16 mx-4 text-2xl pt-4 grid justify-items-center font-bold"> xyz company </div>
            <div className="px-12 mt-4">
                {rawData  ? rawData.message ? <p className="font-bold ml-8 text-xl ">{rawData.message}</p> :
                rawData.map((items,index)=>(
                <div key={index} className="border rounded-lg border-[#a29f9f]   mb-4 h-18 px-2">
                    <div className="flex">
                        <div className="border rounded-full w-16 h-16 my-auto ml-2 mt-2"></div>
                        <div className="my-auto ml-6 font-bold text-xl">{items.username}</div>
                        <button  onClick={()=>{deleteUser(items.username)}} className="my-auto border border-[#a29f9f] rounded-md px-2 hover:text-black ml-auto mr-2">Delete</button>
                    </div>
                    <div className=" ml-24 mb-2 flex">
                        <div>{items.type}</div>
                    </div>
                </div>)): (
                <p>Please Login </p>
                )} 
            </div> 
        </div>
        
        </>
    )
}