"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import AuthCard from "@/components/ui/AuthCard";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", { email });
      console.log("Reset link sent", response.data);
      toast.success("Password reset link sent to your email");
      // Delayed push to give time to see toast
      setTimeout(() => router.push("/login"), 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Reset Password"
      description="We'll send you a link to reset your password"
      category="Account Recovery"
      colorTheme="orange"
    >
      <form onSubmit={handleForgotPassword} className="space-y-6">
        <InputField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={(e) => {
            const cardElement = document.querySelector(".glass-card");
            cardElement?.classList.add("form-active");
          }}
          onBlur={(e) => {
            const cardElement = document.querySelector(".glass-card");
            cardElement?.classList.remove("form-active");
          }}
          placeholder="name@example.com"
          icon={Mail}
          required
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="pt-2"
        >
          <Button type="submit" isLoading={loading} disabled={!email} withArrow>
            Send Reset Link
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center"
        >
          <Link
            href="/login"
            className="inline-flex items-center text-sm text-slate-500 hover:text-slate-300 transition-colors group"
          >
            <ArrowLeft size={16} className="mr-1.5 group-hover:-translate-x-1 transition-transform" />
            Back to login
          </Link>
        </motion.div>
      </form>
    </AuthCard>
  );
}
