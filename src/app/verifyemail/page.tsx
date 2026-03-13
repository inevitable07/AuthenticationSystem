"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import AuthCard from "@/components/ui/AuthCard";
import Button from "@/components/ui/Button";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/verifyemail", { token });
      if (response.status === 200) {
        setVerified(true);
        toast.success("Email verified successfully");
      }
    } catch (error: any) {
      setError(true);
      console.log(error);
      toast.error(error.response?.data?.error || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Extract token from URL
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <AuthCard
      title="Verify Email"
      description={
        loading
          ? "Verifying your email address..."
          : verified
          ? "Your email is confirmed!"
          : error
          ? "Verification unsuccessful"
          : "Checking your verification token..."
      }
      category="Email Verification"
      colorTheme="green"
    >
      <div className="flex flex-col items-center justify-center space-y-8 py-4">
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-sky-400"
          >
            <Loader2 size={56} strokeWidth={1.5} />
          </motion.div>
        )}

        {verified && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center space-y-6 w-full"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
              className="text-emerald-400 flex justify-center"
            >
              <CheckCircle2 size={64} strokeWidth={1} />
            </motion.div>
            <div>
              <p className="text-slate-300 text-base leading-relaxed">
                Your email has been successfully verified. You can now access all features of your account.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="pt-2 w-full"
            >
              <Link href="/login" className="block w-full">
                <Button withArrow>Login to Dashboard</Button>
              </Link>
            </motion.div>
          </motion.div>
        )}

        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center space-y-6 w-full"
          >
            <div className="text-red-400 flex justify-center">
              <XCircle size={64} strokeWidth={1} />
            </div>
            <div>
              <p className="text-slate-300 text-base leading-relaxed">
                We couldn't verify your email. The token may be invalid or has expired. Please try requesting a new verification link.
              </p>
            </div>
          </motion.div>
        )}

        {!token && !loading && !error && !verified && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center space-y-6 w-full"
          >
            <div className="text-amber-400 flex justify-center">
              <XCircle size={64} strokeWidth={1} />
            </div>
            <p className="text-slate-300 text-base">No verification token found in the URL.</p>
          </motion.div>
        )}
      </div>
    </AuthCard>
  );
}

