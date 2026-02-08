"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { get } from "http";



export default function ProfilePage() {

    const router = useRouter();
    const [userData, setUserData] = useState("nothing");

    const logout = async () => {
        try {

            const response = await axios.get("/api/users/logout");
            toast.success("Logout successful.");
            router.push("/login");
            
        } catch (error:any) {
            console.error("Logout error:", error);
            toast.error("An error occurred during logout."); 
        }
    }

    const getUserData = async () => {
        const res = await axios.get("/api/users/userData");
        console.log(res.data);
        setUserData(res.data.data._id);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black-500 space-y-4">
            <h1>Profile</h1>
            <hr/>
            <p>profile page </p>
            <h2>{userData === "nothing" ? "Loading..." : <Link href={`/profile/${userData}`}>{userData}</Link>}</h2>
            <hr/>
            <button 
            className="bg-red-500 text-white px-4 py-4 rounded" 
            onClick={logout}>
            Logout   
            </button>
            <button 
            className="bg-green-800 text-white px-4 py-4 rounded" 
            onClick={getUserData}>
            Get Details  
            </button>
        </div>
    );
}