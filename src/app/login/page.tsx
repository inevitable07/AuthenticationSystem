"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import AuthCard from "@/components/ui/AuthCard";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (buttonDisabled) return;

    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login successful", response.data);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <AuthCard 
      title="Welcome Back" 
      description="Sign in to your account to continue"
      category="Authentication"
      colorTheme="blue"
    >
      <form onSubmit={onLogin} className="space-y-6">
        <div className="space-y-4">
          <InputField
            label="Email Address"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
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

          <div>
            <InputField
              label="Password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              onFocus={(e) => {
                const cardElement = document.querySelector(".glass-card");
                cardElement?.classList.add("form-active");
              }}
              onBlur={(e) => {
                const cardElement = document.querySelector(".glass-card");
                cardElement?.classList.remove("form-active");
              }}
              placeholder="••••••••"
              icon={Lock}
              required
            />
            <div className="flex justify-end mt-2">
              <Link 
                href="/forgotpassword" 
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="pt-4"
        >
          <Button
            type="submit"
            isLoading={loading}
            disabled={buttonDisabled}
            withArrow
          >
            Continue to Dashboard
          </Button>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center text-sm text-slate-500"
        >
          Don't have an account?{" "}
          <Link href="/signup" className="text-sky-400 hover:text-sky-300 font-bold transition-colors hover:underline">
            Create one
          </Link>
        </motion.p>
      </form>
    </AuthCard>
  );
}
