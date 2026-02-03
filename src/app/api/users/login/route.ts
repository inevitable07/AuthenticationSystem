import {connectDB} from "@/DbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest,NextResponse } from "next/server"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {

    try {

        const reqBody = await request.json();
        const {email, password} = reqBody;

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message: "Invalid email or password"},
                {status: 401}
            );
        }

        const isvalidPassword = await bcrypt.compare(password, user.password);
        if(!isvalidPassword){
            return NextResponse.json({message: "Invalid password"},
                {status: 401}
            );
        }

        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,
            {expiresIn: '1d'});

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        response.cookies.set("token",token, {
            httpOnly:true,
        })
        return response;

        
    } catch (error : any) {

        return NextResponse.json({error: error.message},
            {status: 500}
        );
        
    }
}