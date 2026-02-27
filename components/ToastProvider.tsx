"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#0F0F15",
          color: "#fff",
          border: "1px solid rgba(191, 0, 255, 0.25)",
          boxShadow: "0 0 15px rgba(191, 0, 255, 0.2)",
        },
        success: {
          iconTheme: {
            primary: "#BF00FF",
            secondary: "#fff",
          },
          style: {
            background: "#0F0F15",
            color: "#fff",
            border: "1px solid rgba(0, 240, 255, 0.25)",
            boxShadow: "0 0 15px rgba(0, 240, 255, 0.2)",
          },
        },
        error: {
          iconTheme: {
            primary: "#FF00FF",
            secondary: "#fff",
          },
          style: {
            background: "#0F0F15",
            color: "#fff",
            border: "1px solid rgba(255, 0, 255, 0.25)",
            boxShadow: "0 0 15px rgba(255, 0, 255, 0.2)",
          },
        },
      }}
    />
  );
}
