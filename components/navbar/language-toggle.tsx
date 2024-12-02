"use client";
import * as React from "react";
import { Earth } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function LanguageToggle() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  function ReturnLanguageIcon(locale: string) {
    switch (locale) {
      case "fr":
        return (
          <Image alt="French" src="/France.svg" width={"22"} height={"22"} />
        );
      case "en":
        return (
          <Image
            alt="English"
            src="/UnitedKingdomOfGreatBritainAndNorthernIreland.svg"
            width={"22"}
            height={"22"}
          />
        );
      case "it":
        return (
          <Image alt="Italian" src="/Italy.svg" width={"22"} height={"22"} />
        );
      default:
        return <Earth />;
    }
  }

  const changeLocale = (newLocale: string) => {
    const currentPath = window.location.pathname;
    const updatedPath = `/${newLocale}${currentPath.replace(/^\/(en|fr|it)/, "")}`;
    router.push(updatedPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-11 w-11 hover:scale-110 transition ease-in-out delay-250"
        >
          {ReturnLanguageIcon(locale)}
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="gap-4" onClick={() => changeLocale("fr")}>
          <Image alt="French" src="/France.svg" width={"16"} height={"16"} />
          {t("language.french")}
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-4" onClick={() => changeLocale("en")}>
          <Image
            alt="English"
            src="/UnitedKingdomOfGreatBritainAndNorthernIreland.svg"
            width={"16"}
            height={"16"}
          />
          {t("language.english")}
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-4" onClick={() => changeLocale("it")}>
          <Image alt="Italian" src="/Italy.svg" width={"16"} height={"16"} />
          {t("language.italian")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
