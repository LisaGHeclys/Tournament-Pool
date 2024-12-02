"use client";
import { redirect } from "next/navigation";
import { useLocale } from "next-intl";

export default function RedirectToUser() {
  const locale = useLocale();
  redirect(`/${locale}/user`);
}
