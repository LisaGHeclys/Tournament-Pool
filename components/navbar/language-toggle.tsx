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
import { useTranslations } from "next-intl";

export function LanguageToggle() {
  const t = useTranslations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-11 w-11 hover:scale-110 transition ease-in-out delay-250"
        >
          <Earth />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => {}}>
          {t("language.french")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          {t("language.english")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          {t("language.italian")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
