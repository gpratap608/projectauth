'use client'
import axios from "axios"
import Link from "next/link"
import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProfilePage(){

    const router = useRouter()
    const [data,setData] = useState("")
    async function logout() {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout Successful')
            router.push("/login")
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me")
        console.log(res.data)
        setData(res.data.data._id)
    }
    return(
        <main>
            <h1>Profile</h1>
            <p>Profile page </p>
            <h1>{data === 'nothing'? "Nothing": <Link href={`/profile/${data}`}>{data}</Link>} </h1>
            <hr/>
            <button
            onClick={logout}
            >Logout</button>
            <button
            onClick={getUserDetails}
            >User Details</button>
        </main>
    )
}