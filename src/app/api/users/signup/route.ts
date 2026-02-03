import {connectDB} from "@/DbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest,NextResponse } from "next/server"
import bcrypt from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
        try {
            const reqBody = await request.json();
            const {username, email, password} = reqBody;

            const user = await User.findOne({email});

            if(user){
                return NextResponse.json({message: "User already exists"},
                    {status: 400}
                );  
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                username,
                email,
                password: hashedPassword
            })

            const savedUser = await newUser.save();

            return NextResponse.json({message: "User registered successfully",
                success: true,
                user: savedUser},
                {status: 201}
            );



        } catch (error: any) {
            return NextResponse.json({error: error.message},
                {status: 500}
            );
        }
}