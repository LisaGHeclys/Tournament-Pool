import type { Metadata } from "next";
import localFont from "next/font/local";
<<<<<<<< HEAD:app/(views)/[locale]/layout.tsx
import AppProvider from "@/providers/app-provider";
import "../../../styles/globals.css";

const geistSans = localFont({
  src: "../../../styles/fonts/GeistVF.woff",
========
import "../../styles/globals.css";
import AppProvider from "@/providers/app-provider";

const geistSans = localFont({
  src: "../../styles/fonts/GeistVF.woff",
>>>>>>>> main:app/(views)/layout.tsx
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
<<<<<<<< HEAD:app/(views)/[locale]/layout.tsx
  src: "../../../styles/fonts/GeistMonoVF.woff",
========
  src: "../../styles/fonts/GeistMonoVF.woff",
>>>>>>>> main:app/(views)/layout.tsx
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
