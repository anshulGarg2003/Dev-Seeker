"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { CallProvider } from "@/context/CallContext";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <CallProvider>{children}</CallProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
