import type { Metadata } from "next";
import localFont from "next/font/local";
import AppProvider from "@/providers/app-provider";
import "../../../styles/globals.css";

const geistSans = localFont({
  src: "../../../styles/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../../styles/fonts/GeistMonoVF.woff",
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
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
