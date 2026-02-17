import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function proxy(request: NextRequest) {

    const path = request.nextUrl.pathname;
    const publicPaths = [
              "/login", 
              "/signup", 
              "/verifyemail", 
              "/forgotpassword", 
              "/resetpassword"];
    const isPathPublic = publicPaths.includes(path);

    const token = request.cookies.get("token")?.value || '';

    if(isPathPublic && token){
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if(!isPathPublic && !token){
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  
}
 

export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup",
    "/verifyemail",
    "/forgotpassword",
    "/resetpassword",
  ]
}