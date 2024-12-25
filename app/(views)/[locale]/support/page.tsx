"use client";
import React from "react";
import Footer from "@/components/ui/footer";
import { Card, CardContent } from "@/components/ui/card";
import { UserNav } from "@/components/navbar/user-nav";
import { useLocale, useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Support() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="min-h-screen gap-2 sm:p-14 p-8 sm:gap-6 grid sm:grid-rows-[20px_1fr_20px] items-center sm:justify-items-center font-[family-name:var(--font-geist-sans)]">
      <UserNav title="pages.support" isBack backPath={`/${locale}/`} centered />
      <main className="gap-2 h-full w-full flex flex-col md:gap-6 row-start-2 items-center justify-center">
        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          {t("support.title")}
        </h2>
        <p className="w-full md:w-1/3 leading-7 [&:not(:first-child)]:mt-6">
          {t("support.description-1")}
          {t("support.description-2")}
          <a
            className="hover:underline"
            href="https://github.com/LisaGHeclys/Tournament-Pool/discussions/categories/general"
          >
            {t("support.description-3")}
          </a>
        </p>
        <Card className="w-full md:w-1/3 pt-4">
          <CardContent className="flex flex-col gap-2">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q-1">
                <AccordionTrigger>{t("support.Q1.title")}</AccordionTrigger>
                <AccordionContent>{t("support.Q1.response")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="q-2">
                <AccordionTrigger>{t("support.Q2.title")}</AccordionTrigger>
                <AccordionContent>
                  {t("support.Q2.response-1")}
                </AccordionContent>
                <AccordionContent>
                  {t("support.Q2.response-2")}
                </AccordionContent>
                <AccordionContent>
                  {t("support.Q2.response-3")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q-3">
                <AccordionTrigger>{t("support.Q3.title")}</AccordionTrigger>
                <AccordionContent>
                  {t("support.Q3.response-1")}
                </AccordionContent>
                <AccordionContent>
                  {t("support.Q3.response-2")}
                </AccordionContent>
                <AccordionContent>
                  {t("support.Q3.response-3")}
                </AccordionContent>
                <AccordionContent>
                  {t("support.Q3.response-4")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q-4">
                <AccordionTrigger>{t("support.Q4.title")}</AccordionTrigger>
                <AccordionContent>
                  {t("support.Q4.response-1")}
                </AccordionContent>
                <AccordionContent>
                  {t("support.Q4.response-2")}
                </AccordionContent>
                <AccordionContent>
                  {t("support.Q4.response-3")}
                </AccordionContent>
                <AccordionContent>
                  {t("support.Q4.response-4")}
                </AccordionContent>
                <AccordionContent>
                  {t("support.Q4.response-5")}
                </AccordionContent>
                <AccordionContent>
                  {t("support.Q4.response-6")}
                </AccordionContent>
                <AccordionContent>
                  {t("support.Q4.response-7")}
                </AccordionContent>
                <AccordionContent>
                  {t("support.Q4.response-8")}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q-5">
                <AccordionTrigger>{t("support.Q5.title")}</AccordionTrigger>
                <AccordionContent>{t("support.Q5.response")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="q-6">
                <AccordionTrigger>{t("support.Q6.title")}</AccordionTrigger>
                <AccordionContent>{t("support.Q6.response")}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
