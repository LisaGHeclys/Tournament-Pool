import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import CookieConsentBanner from "@/components/ui/cookie-consent-banner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tournament Pool",
  description: "To create tournament and animate them",
  icons: {
    icon: "/logo-tp-light.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        id="root"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
