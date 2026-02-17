import { connectDB } from "@/DbConfig/dbConfig";
import { NextResponse, NextRequest} from "next/server";
import User from "@/models/userModel";
import crypto from 'crypto';
import { sendEmail } from "@/helper/mailer";
import bcrypt from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({message: "User not found"}, {status: 404});
        }

        await sendEmail({email, emailType: "RESET", userId: user._id});

        return NextResponse.json({message: "Password reset link sent to your email"}, {status: 200});



        
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({message: error.message}, {status: 500});
    }
}