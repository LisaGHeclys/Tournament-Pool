"use client";
import React from "react";
import Footer from "@/components/ui/footer";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { UserNav } from "@/components/navbar/user-nav";
import { useTranslations } from "next-intl";

export default function PrivacyPolicy() {
  const t = useTranslations();

  return (
    <div className="min-h-screen gap-2 sm:p-14 p-8 sm:gap-6 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center font-[family-name:var(--font-geist-sans)]">
      <UserNav title="pages.privacy-policy" isBack backPath={"/"} centered />
      <main className="gap-2 h-full w-full flex flex-col lg:flex-row md:gap-6 row-start-2 items-center justify-center">
        <Card className="w-full md:w-2/3 pt-4">
          <CardContent className="flex flex-col gap-2">
            <p className="text-sm text-current">
              {t("privacy-policy.last-updated")}12/11/2024
            </p>
            <p>
              {t("privacy-policy.small-description-1")}
              <Link
                href={process.env.NEXT_PUBLIC_URL as string}
                className="text-blue-500"
              >
                {process.env.NEXT_PUBLIC_URL}
              </Link>
              {t("privacy-policy.small-description-2")}
              <br />
              {t("privacy-policy.small-description-3")}
            </p>
            <h1 className="pt-3 text-xl font-semibold">
              {t("privacy-policy.1")}
            </h1>
            <h3>
              {t("privacy-policy.1-1")}
              <ul>
                <li>{t("privacy-policy.1-2")}</li>
                <li>{t("privacy-policy.1-3")}</li>
              </ul>
              {t("privacy-policy.1-4")}
            </h3>
            <h1 className="pt-3 text-xl font-semibold">
              {t("privacy-policy.2")}
            </h1>
            <p>{t("privacy-policy.2-1")}</p>
            <h1 className="pt-3 text-xl font-semibold">
              {t("privacy-policy.3")}
            </h1>
            <p>{t("privacy-policy.3-1")}</p>
            <h1 className="pt-3 text-xl font-semibold">
              {t("privacy-policy.4")}
            </h1>
            <p>{t("privacy-policy.4-1")}</p>
            <h1 className="pt-3 text-xl font-semibold">
              {t("privacy-policy.5")}
            </h1>
            <p>
              {t("privacy-policy.5-1")}
              <Link
                href="mailto:lisa.glaziou@gmail.com"
                className="text-blue-500"
              >
                lisa.glaziou@gmail.com
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
