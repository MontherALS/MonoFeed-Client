import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ToastProvider from "@/components/ToastProvider";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "MonoFeed",
  description: "A modern video sharing platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className=" overflow-y-auto h-[calc(100vh-4rem)]">{children}</main>
          <ToastProvider />
        </AuthProvider>
      </body>
    </html>
  );
}
