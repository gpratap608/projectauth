import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { userName, email, password } = reqBody;

    // Debug: Log the received request body
    console.log("Received request body:", reqBody);

    // Check if the "userName" field is provided in the request
    if (!userName || !email || !password) {
      // Debug: Log the missing fields
      console.error("Missing fields in the request:", { userName, email, password });
      return NextResponse.json({ error: "Please provide all required fields" }, { status: 400 });
    }

    // Check if user already exists
    await connect();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Debug: Log the existing user
      console.log("User already exists:", existingUser);
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Debug: Log the saved user
    console.log("User created successfully:", savedUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    // Debug: Log any errors that occur
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
   