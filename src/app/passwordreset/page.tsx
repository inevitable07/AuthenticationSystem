"use client";
import axios from "axios";
import React,{useEffect, useState } from "react"; 
import Link from "next/link";

export default function PasswordResetPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
}