"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { User, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import AuthCard from "@/components/ui/AuthCard";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";

export default function SignUpPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (buttonDisabled) return;

    if (user.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup successful", response.data);
      toast.success("Account created successfully");
      router.push("/login");
    } catch (error: any) {
      const message = error.response?.data?.message;
      toast.error(message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0 &&
      confirmPassword.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user, confirmPassword]);

  return (
    <AuthCard 
      title="Create Account" 
      description="Join us and start exploring"
      category="Registration"
      colorTheme="purple"
    >
      <form onSubmit={onSignUp} className="space-y-6">
        <div className="space-y-4">
          <InputField
            label="Username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            onFocus={(e) => {
              const cardElement = document.querySelector(".glass-card");
              cardElement?.classList.add("form-active");
            }}
            onBlur={(e) => {
              const cardElement = document.querySelector(".glass-card");
              cardElement?.classList.remove("form-active");
            }}
            placeholder="johndoe"
            icon={User}
            required
          />

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

          <InputField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            error={confirmPassword && user.password !== confirmPassword ? "Passwords do not match" : undefined}
          />
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
            Create My Account
          </Button>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center text-sm text-slate-500"
        >
          Already have an account?{" "}
          <Link href="/login" className="text-sky-400 hover:text-sky-300 font-bold transition-colors hover:underline">
            Sign in
          </Link>
        </motion.p>
      </form>
    </AuthCard>
  );
}
