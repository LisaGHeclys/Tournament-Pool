import { ToasterProvider } from "@/providers/toaster-provider";
import CookieConsentProvider from "@/providers/cookie-consent-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "@/providers/tanstack-query-provider";

export default function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </SessionProvider>
      <ToasterProvider />
      <CookieConsentProvider />
    </ReactQueryProvider>
  );
}
