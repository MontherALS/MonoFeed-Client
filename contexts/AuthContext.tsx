"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogInUserDataType } from "@/Types/AuthType";
import axios from "axios";
import toast from "react-hot-toast";

type AuthContextType = {
  user: LogInUserDataType["userData"] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<LogInUserDataType["userData"] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const meRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`, { credentials: "include" });
      if (meRes.ok) { 
        const data = await meRes.json();
        setUser((data?.userData as LogInUserDataType["userData"]) ?? null);
        setIsAuthenticated(true);
        return;
      }

      if (meRes.status === 401) {
        const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (refreshRes.ok) {
          const meRes2 = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`, { credentials: "include" });
          if (meRes2.ok) {
            const data2 = await meRes2.json();
            setUser((data2?.userData as LogInUserDataType["userData"]) ?? null);
            setIsAuthenticated(true);
            return;
          }
        }
      }

      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, { email, password }, { withCredentials: true });
      
      if (!res.data?.userData) {
        toast.error("Wrong email or password");
        return;
      }

      const { userData } = res.data as LogInUserDataType;
      setUser(userData);
      setIsAuthenticated(true);
      toast.success("Login successful");
      router.push("/");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || "Login failed";
      toast.error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
