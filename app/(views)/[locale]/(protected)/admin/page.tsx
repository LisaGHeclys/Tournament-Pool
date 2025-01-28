"use client";
import { useLocale } from "next-intl";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const locale = useLocale();
  const { data: session } = useSession();

  if (session?.user && session?.user?.role === "admin") {
    redirect(`/${locale}/admin/dashboard`);
  } else {
    redirect(`/${locale}/`);
  }
}
