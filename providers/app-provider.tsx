"use client";
import { ToasterProvider } from "@/providers/toaster-provider";
import CookieConsentProvider from "@/providers/cookie-consent-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { SessionProvider } from "next-auth/react";
import { TanstackQueryProvider } from "@/providers/tanstack-query-provider";
import { ReactNode } from "react";
import { IntlProvider } from "@/providers/intl-provider";

export default function AppProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <IntlProvider>
      <TanstackQueryProvider>
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
      </TanstackQueryProvider>
    </IntlProvider>
  );
}
