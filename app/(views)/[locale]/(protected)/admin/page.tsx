"use client";
import { useLocale } from "next-intl";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const locale = useLocale();
  const { data: session } = useSession();

  if (session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    redirect(`/${locale}/admin/dashboard`);
  } else {
    redirect(`/${locale}/`);
  }
}
