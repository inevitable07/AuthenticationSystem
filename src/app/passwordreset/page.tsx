"use client";
import axios from "axios";
import React,{useEffect, useState } from "react"; 
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PasswordResetPage() {

    const router = useRouter();
    const [newPassword, setNewPassword] = useState("");
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const resetPassword = async () => {
        setError(false);
        setVerified(false);
        if(!newPassword || newPassword.length < 6){
            setError(true);
            return;
        }
        if (!token) {
            setError(true);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/users/passwordreset", 
                { token, newPassword });
            if (response.status === 200) {
                setVerified(true);
                setNewPassword("");
                setTimeout(() => {
                    router.push("/login");
                }, 3000);
            }
            
            
        } catch (error:any) {
            setError(true);
            console.log(error);
            console.error(error.response?.data || error.message);
        }finally {
            setLoading(false);
        }
    }
    useEffect(() => {
            const urlToken = window.location.search.split("=")[1];
            setToken(urlToken || "");
        }, []);

        return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Reset Password</h1>
            <h2 className="p-2 bg-amber-600 text-black">{token? `${token}`:"No Token Found"}</h2>
            <input
              type="password"
              id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
              placeholder="Enter your new password"
              required
            />
            <button
              onClick={resetPassword}
              disabled={loading || !token || !newPassword}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium mt-6"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            {verified &&(
                <div className="p-4 bg-green-600 text-white rounded">
                    <h2 className="text-2xl">Password Reset Successfully!</h2>
                    <p>You can now <Link href="/login" className="underline">login</Link>.</p>
                </div>
            )}
            {error &&(
                <div className="p-4 bg-red-600 text-black rounded">
                    <h2 className="text-2xl">Error While Resetting Password</h2>
                </div>
            )}
        </div>
        )
    
}