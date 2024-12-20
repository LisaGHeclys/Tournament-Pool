import { useSession } from "next-auth/react";
import { UserToggle } from "@/components/navbar/user-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/navbar/theme-toggle";
import { ChevronLeft } from "lucide-react";
import { useWindowSize } from "@/hooks/use-window-size";
import { useLocale, useTranslations } from "next-intl";
import { LanguageToggle } from "@/components/navbar/language-toggle";

interface UserNavProps {
  title: string;
  isBack?: boolean;
  backPath?: string;
  avatar?: boolean;
  centered?: boolean;
  isEdit?: boolean;
  children?: ReactNode;
  username?: string;
}

export function UserNav({
  title,
  isBack = false,
  backPath,
  avatar = false,
  centered = false,
  isEdit = false,
  username,
  children,
}: UserNavProps): JSX.Element {
  const size = useWindowSize();
  const router = useRouter();
  const { status } = useSession();
  const t = useTranslations();
  const locale = useLocale();

  function handleUserNav() {
    switch (status) {
      case "authenticated":
        return avatar && <UserToggle />;
      case "loading":
        return <Skeleton className="h-8 w-8 rounded-full" />;
      default:
        return (
          <Button
            className="hover:scale-105 transition ease-in-out delay-250"
            onClick={() => router.push(`/${locale}/login`)}
          >
            <span>{t("navbar.login")}</span>
          </Button>
        );
    }
  }
  return (
    <header className="gap-2 md:gap-0 md:p-8 w-full md:h-fit flex flex-col md:flex-row items-center justify-between">
      {centered &&
        (isBack && backPath ? (
          <Button
            className="self-start rounded-full hover:scale-[102%] transition ease-in-out delay-250"
            size="icon"
            onClick={() => {
              router.push(backPath);
            }}
          >
            <ChevronLeft size={size.width <= 425 ? 18 : 32} />
          </Button>
        ) : (
          <div />
        ))}
      <div className="flex flex-row gap-2 items-center">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight lg:text-5xl">
          {t(title)} {username && username}
        </h1>
        {isEdit && children}
      </div>
      <div className="w-full md:w-fit flex flex-row gap-4 md:gap-6 items-center justify-end md:justify-center">
        <LanguageToggle />
        <ThemeToggle />
        {handleUserNav()}
      </div>
    </header>
  );
}
