"use client";
import { ToasterProvider } from "@/providers/toaster-provider";
import CookieConsentProvider from "@/providers/cookie-consent-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { SessionProvider } from "next-auth/react";
import { TanstackQueryProvider } from "@/providers/tanstack-query-provider";
import { ReactNode } from "react";
import { IntlProvider } from "@/providers/intl-provider";
import { Onborda, OnbordaProvider } from "onborda";
import { steps } from "@/lib/steps";
import MyCard from "@/components/tours/my-card";

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
            <OnbordaProvider>
              <Onborda
                showOnborda
                steps={steps}
                cardComponent={MyCard}
                shadowOpacity="0.8"
                cardTransition={{ type: "tween" }}
              >
                {children}
              </Onborda>
            </OnbordaProvider>
          </ThemeProvider>
        </SessionProvider>
        <ToasterProvider />
        <CookieConsentProvider />
      </TanstackQueryProvider>
    </IntlProvider>
  );
}
