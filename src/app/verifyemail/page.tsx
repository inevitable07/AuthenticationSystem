"use client";
import axios from "axios";
import React,{useEffect, useState } from "react"; 
import Link from "next/link";

export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyemail", 
                { token });
            if (response.status === 200) {
                setVerified(true);
            }
        } catch (error: any) {
            setError(true);
            console.log(error);
            console.error(error.response?.data || error.message);
        }  
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-amber-600 text-black">{token? `${token}`:"No Token"}</h2>

            {verified &&(
                <div className="p-4 bg-green-600 text-white rounded">
                    <h2 className="text-2xl">Email Verified Successfully!</h2>
                    <p>You can now <Link href="/login" className="underline">login</Link>.</p>
                </div>
            )}
            {error &&(
                <div className="p-4 bg-red-600 text-black rounded">
                    <h2 className="text-2xl">Error While Verifying Email</h2>
                </div>
            )}
        </div>)
};
