import { connectDB } from "@/DbConfig/dbConfig";
import { NextResponse, NextRequest} from "next/server";
import User from "@/models/userModel";
import crypto from 'crypto';
connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log("Incoming raw token:", token);

        const hashedToken = crypto
                            .createHash("sha256")
                            .update(token)
                            .digest("hex");

        console.log("Hashed token:", hashedToken);
        
        const user = await User.findOne({
            verificationToken: hashedToken, 
            verificationTokenExpiry: {$gt: Date.now()}
        });

        if(!user){
            return NextResponse.json({message: "Invalid or expired token"}, {status: 400});
        }

        console.log(user);
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({message: "Email verified successfully"}, {status: 200});
    } catch (error:any) {
        console.error("Error verifying email:", error);
        console.log(error);
        return NextResponse.json({message: error.message}, {status: 500});
    }
};
