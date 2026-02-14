import { connectDB } from "@/DbConfig/dbConfig";
import { NextResponse, NextRequest} from "next/server";
import User from "@/models/userModel";
connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);
        const user = await User.findOne({
            verificationToken: token, 
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
        return NextResponse.json({message: error.message}, {status: 500});
    }
};
