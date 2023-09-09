'use client'

import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import {  toast } from "react-hot-toast"

export default function signupPage(){
    const router = useRouter()
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        userName:""
    })
    const [buttonDisabled,setButtonDisabled]  = React.useState(false)
    const [loading,setLoading] = React.useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response =await axios.post('/api/users/signup', user)
            console.log("SignUp success",response.data)
            router.push("/login")
        } catch (error) {
            console.log("signup Failed",error)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }

    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.userName.length>0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])

    return(
        <main>
            <h1> {loading?"Processing...":"SignUp"} </h1>
            <hr/>
            <label htmlFor="userName">userName</label>
            <input
                id="userName"
                type="text"
                value={user.userName}
                onChange={(e)=>setUser({...user,userName:e.target.value})}
                placeholder="UserName"
            />
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
            <button onClick={onSignup}>{buttonDisabled ? "No SignUp":"SignUp"}</button>
            <Link href="/login"> Login </Link>
        </main>
    )
}