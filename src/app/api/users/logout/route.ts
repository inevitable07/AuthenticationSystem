import { request } from "http";
import { NextResponse } from "next/server";


export async function GET() {

    try {
        const response = NextResponse.json(
            { 
                message: "Logout successful.",
                status: 200,
                success: true
            }
        );
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
        return response;
        
    } catch (error:any) {
        console.error("Error during logout:", error);
        return NextResponse.json(
            { message: "An error occurred during logout." },
            { status: 500 }
        );
        
    }
}