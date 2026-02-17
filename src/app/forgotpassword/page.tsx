"use client";

import Link from "next/link";
import React, {  useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [loading,setLoading] = React.useState(false);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", { email });
      console.log("Reset link sent", response.data);
      toast.success("Password reset link sent to your email");
      router.push("/login"); // not working properly, need to refresh page to see the toast message. Will fix later
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium mt-6"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Remember your password?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}