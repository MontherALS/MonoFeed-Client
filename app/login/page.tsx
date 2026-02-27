"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { LoginType, LogInUserDataType } from "@/Types/AuthType";

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginType>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", formData, { withCredentials: true });
      if (!res.data?.token) {
        toast.error("Wrong email or password");
        return;
      }
      localStorage.setItem("token", res.data.token); //! chane it to cookie later

      const { userData } = res.data as LogInUserDataType;
      localStorage.setItem("id", userData.id); //! chane it to cookie later

      toast.success("Login successful");
      window.location.href = "/";
    } catch (error: any) {
      console.error(error);
      const errorMessage = error?.response?.data?.message || error?.message || "Login failed";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 mb-8 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <span className="text-4xl font-bold neon-text group-hover:scale-105 transition-transform duration-300 tracking-tight">Bite Marks</span>
          </Link>
          <p className="text-gray-300 mt-2 font-semibold">Welcome back!</p>
        </div>

        <div className="bg-dark-light rounded-2xl p-8 border border-neon-purple/30 shadow-glow-purple backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6 neon-text-blue">Log in</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="email"
              label="Email"
              placeholder="Enter your username or email"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

            <div className="flex items-center justify-between text-sm">
              <Link href="/forgot-password" className="text-neon-cyan hover:text-neon-cyan-light transition-colors hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neon-purple/25"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-light text-neon-cyan">OR</span>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-300">
            Don't have an account?{" "}
            <Link href="/signup" className="text-neon-purple hover:text-neon-purple-light font-semibold transition-colors hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
