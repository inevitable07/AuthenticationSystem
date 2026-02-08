"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function ProfilePage() {

    const router = useRouter();

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
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black-500 space-y-4">
            <h1>Profile</h1>
            <hr/>
            <p>profile page </p>
            <hr/>
            <button 
            className="bg-red-500 text-white px-4 py-4 rounded" 
            onClick={logout}>
            Logout   
            </button>
        </div>
    );
}