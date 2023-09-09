import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";


export async function POST(request){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody
        console.log(reqBody)
        await connect()
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User Does Not Exist"},{status:400})
        }
        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid Password"},
            {status:400})
        }
        //Create Token Data
        const tokenData = {
            id:user._id,
            userName:user.userName,
            email:user.email
        }

        //create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1d"})

        const response = NextResponse.json({
            message:"Login Successful",
            success:true,
        })
        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response
    } catch (error) {
        return NextResponse.json({error:error.message},
            {status:500})
    }
}