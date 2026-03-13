"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut, User as UserIcon, Mail } from "lucide-react";
import AuthCard from "@/components/ui/AuthCard";
import Button from "@/components/ui/Button";

interface UserData {
  username: string;
  email: string;
  _id: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const res = await axios.get("/api/users/userData");
      // Assuming res.data.data contains the user object with username and email
      setUser(res.data.data);
    } catch (error) {
      console.log("Failed to fetch user data", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-sky-400">Loading profile...</div>
      </div>
    );
  }

  return (
    <AuthCard
      title="Your Profile"
      description="Manage your account settings"
      colorTheme="cyan"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          {/* User Info Items */}
          <div className="glass-input rounded-lg p-4 flex items-center space-x-4">
            <div className="p-2 bg-sky-500/10 rounded-lg text-sky-400">
              <UserIcon size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Username</p>
              <p className="text-white font-medium">{user?.username || "N/A"}</p>
            </div>
          </div>

          <div className="glass-input rounded-lg p-4 flex items-center space-x-4">
            <div className="p-2 bg-sky-500/10 rounded-lg text-sky-400">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Email</p>
              <p className="text-white font-medium">{user?.email || "N/A"}</p>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-slate-700/50">
          <Button
            onClick={logout}
            variant="secondary"
            className="group"
          >
            <LogOut size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Logout
          </Button>
        </div>
      </div>
    </AuthCard>
  );
}
