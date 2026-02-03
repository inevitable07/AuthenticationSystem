"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";


export default function SignUpPage() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    const onSignUp = async () =>{
      try {

        setLoading(true);
        const response = await axios.post("/api/users/signup", user);
        console.log("Signup successful", response.data);
        toast.success("Signup successful");
        router.push("/login");

      } catch (error: any) {
        const message = error.response?.data?.message;
        toast.error(message || "Signup failed");
      }finally{
        setLoading(false);
      }

    }

    useEffect(() => {
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-grey-500">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {loading ? "Processing..." : "Create an Account"}
        </h2>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({...user, username: e.target.value})}
              className="w-full px-4 py-2 border  text-cyan-950 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({...user, email:e.target.value})}
              className="w-full px-4 py-2 border text-cyan-950 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({...user, password: e.target.value})}
              className="w-full px-4 py-2 border  text-cyan-950 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          
          <button
          type="button"
            onClick={onSignUp}  
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium mt-6"
            
          >
            {buttonDisabled ? "Fill all fields" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Log in
            </Link>
        </p>
      </div>
    </div>
  );

}