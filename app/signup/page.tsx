"use client";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { SignUpType } from "@/Types/AuthType";
import { useRouter } from "next/navigation";
export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<SignUpType>({
    email: "",
    password: "",
    confirmPassword: "",
    user_name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        return toast.error("Password should match");
      }

      const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup`, formData);

      if (!res) {
        toast.error("Error hppend");
        return;
      }

      toast.success("Signup successful");
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      const errorMessage = error?.response?.data?.message || error?.message || "Signup failed";
      console.error("errorMessage", errorMessage);
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
          <p className="text-gray-300 mt-2 font-semibold">Create your account</p>
        </div>

        <div className="bg-dark-light rounded-2xl p-8 border border-neon-pink/30 shadow-glow-pink backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-6 text-center neon-text-pink">Sign up</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              label="Username"
              placeholder="Choose a username"
              value={formData.user_name}
              onChange={handleChange}
              name="user_name"
            />

            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              name="email"
            />
            <p className="text-sm text-gray-400">The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character and must be at least 8 characters long</p>
            <Input
              type="password"
              label="Password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              name="password"
            />
            <Input
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            />

            <div className="text-sm text-gray-300">
              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 rounded border-neon-purple/50 bg-dark-light text-neon-purple focus:ring-neon-purple focus:ring-1"
                />
                <span>
                  I agree to the{" "}
                  <Link href="/terms" className="text-neon-cyan hover:text-neon-cyan-light hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-neon-cyan hover:text-neon-cyan-light hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neon-pink/25"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-light text-neon-cyan">OR</span>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-300">
            Already have an account?{" "}
            <Link href="/login" className="text-neon-purple hover:text-neon-purple-light font-semibold transition-colors hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
