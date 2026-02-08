import { getDataFromToken } from "@/helper/getDatafromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/DbConfig/dbConfig";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const userId = getDataFromToken(request);
        const user = await User.findById({_id: userId}).select("-password");
        return NextResponse.json({ message: "User data retrieved successfully",
            data: user }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
        
    }
}