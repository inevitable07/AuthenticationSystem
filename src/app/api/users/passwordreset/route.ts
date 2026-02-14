import { connectDB } from "@/DbConfig/dbConfig";
import { NextResponse, NextRequest} from "next/server";
import User from "@/models/userModel";
import crypto from 'crypto';
import bcrypt from "bcryptjs";
connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token,newpassword} = reqBody;
        console.log("Incoming raw token:", token);
        const hashedToken = crypto                            
                            .createHash("sha256")
                            .update(token)
                            .digest("hex");
        console.log("Hashed token:", hashedToken);
        
        const user = await User.findOne({
            forgotPasswordToken: hashedToken, 
            forgotPasswordExpiry: {$gt: Date.now()}
        });
        if(!user){
            return NextResponse.json({message: "Invalid or expired token"}, {status: 400});
        }
        console.log(user);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt);

        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        await user.save();

        return NextResponse.json({message: "Password reset successfully"}, {status: 200});
    } catch (error:any) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
};