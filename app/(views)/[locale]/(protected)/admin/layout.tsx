"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import React from "react";
import { useLocale } from "next-intl";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = useLocale();
  const { data: session } = useSession();

  if (session?.user && session?.user?.role === "admin") {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="px-2">{children}</SidebarInset>
      </SidebarProvider>
    );
  } else redirect(`/${locale}/`);
}
