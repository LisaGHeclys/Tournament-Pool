"use client";
import { redirect } from "next/navigation";
import { useLocale } from "next-intl";

export default function RedirectToHomepage() {
  const locale = useLocale();
  redirect(`/${locale}/`);
}
