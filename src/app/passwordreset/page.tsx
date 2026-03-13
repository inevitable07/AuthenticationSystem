"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import AuthCard from "@/components/ui/AuthCard";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";

export default function PasswordResetPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Extract token from URL
    const urlToken = window.location.search.split("=")[1];
    if (urlToken) {
      setToken(urlToken);
    } else {
      toast.error("Invalid or missing token");
    }
  }, []);

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid reset token");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/users/passwordreset", {
        token,
        newPassword: passwordData.newPassword,
      });

      if (response.status === 200) {
        toast.success("Password reset successfully");
        setPasswordData({ newPassword: "", confirmPassword: "" });
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error while resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create New Password"
      description="Enter a strong password to secure your account"
      category="Security"
      colorTheme="pink"
    >
      <form onSubmit={resetPassword} className="space-y-6">
        <div className="space-y-4">
          <InputField
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
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
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, confirmPassword: e.target.value })
            }
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
            error={
              passwordData.confirmPassword &&
              passwordData.newPassword !== passwordData.confirmPassword
                ? "Passwords do not match"
                : undefined
            }
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="pt-2"
        >
          <Button
            type="submit"
            isLoading={loading}
            disabled={!token || !passwordData.newPassword}
            withArrow
          >
            Update Password
          </Button>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center text-sm text-slate-500"
        >
          Back to login?{" "}
          <Link
            href="/login"
            className="text-sky-400 hover:text-sky-300 font-bold transition-colors hover:underline"
          >
            Sign in here
          </Link>
        </motion.p>
      </form>
    </AuthCard>
  );
}
