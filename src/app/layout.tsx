import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auth App",
  description: "Secure and modern authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 4000,
            style: {
              background: "#000000",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "16px 20px",
              fontSize: "15px",
              fontWeight: "500",
              fontFamily: "'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            },
            success: {
              style: {
                background: "#000000",
                color: "#ffffff",
              },
              icon: (
                <div style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: "16px",
                  flexShrink: 0,
                }}>
                  ✓
                </div>
              ),
            },
            error: {
              style: {
                background: "#000000",
                color: "#ffffff",
              },
              icon: (
                <div style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: "#ef4444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: "16px",
                  flexShrink: 0,
                }}>
                  ✕
                </div>
              ),
            },
          }} 
        />
        {children}
      </body>
    </html>
  );
}
