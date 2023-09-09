'use client'

import { useRouter } from "next/navigation"
import React,{useEffect} from "react"
import axios from "axios"
import Link from "next/link"
import {toast} from "react-hot-toast"

export default function loginPage(){
    const [user,setUser] = React.useState({
        email:"",
        password:"",
    })
    const router = useRouter()

    const [buttonDisabled,setButtonDisabled]  = React.useState(false)
    const [loading,setLoading] = React.useState(false)
    
    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login",user)
            console.log("Login Success",response.data)
            toast.success("Login Success")
            router.push("/profile")
        } catch (error) {
            console.log("Login Failed",error.message)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])

    return(
        <main>
            <h1> {loading?"Processing...":"LogIn"} </h1>
            <hr/>
            <label htmlFor="email">email</label>
            <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e)=>setUser({...user,"email":e.target.value})}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e)=>setUser({...user,password:e.target.value})}
                placeholder="password"
            />
            <button onClick={onLogin}>{buttonDisabled?"No LogIn":"LogIn"}</button>
            <Link href="/signup"> SignUp </Link>
        </main>
    )
}