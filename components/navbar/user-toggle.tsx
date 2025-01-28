"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { BookLock, LifeBuoy, LogOut, User, UserRoundCog } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useLocale, useTranslations } from "next-intl";

export function UserToggle() {
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const t = useTranslations();
  const locale = useLocale();

  async function handleSignOut(e: React.FormEvent) {
    e.preventDefault();

    try {
      await signOut({ redirectTo: `/${locale}/` });
      toast({
        title: t("toast.logout-success.title"),
        description: t("toast.logout-success.description"),
      });
    } catch (e) {
      toast({
        title: t("toast.logout-fail.title") + e,
        description: t("toast.login-fail.description"),
        variant: "destructive",
      });
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-4 w-4 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full"
        >
          <Avatar>
            <AvatarImage
              src={
                session?.user?.image ??
                "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTAiIHI9IjMiLz48cGF0aCBkPSJNNyAyMC42NjJWMTlhMiAyIDAgMCAxIDItMmg2YTIgMiAwIDAgMSAyIDJ2MS42NjIiLz48L3N2Zz4="
              }
              alt={session?.user?.name ?? "UN"}
            />
            <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-46 sm:w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-bold leading-none">
              {session?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push(`/${locale}/user/`)}>
          <User className="mr-2 size-3 md:size-4" />
          <span className="text-xs md:text-sm">{t("pages.your-page")}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push(`/${locale}/support`)}>
          <LifeBuoy className="mr-2 size-3 md:size-4" />
          <span className="text-xs md:text-sm">{t("pages.support")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/${locale}/privacy-policy`)}
        >
          <BookLock className="mr-2 size-3 md:size-4" />
          <span className="text-xs md:text-sm">
            {t("pages.privacy-policy")}
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {session?.user && session?.user?.role === "admin" && (
          <>
            <DropdownMenuItem
              onClick={() => router.push(`/${locale}/admin/dashboard`)}
            >
              <UserRoundCog className="mr-2 size-3 md:size-4" />
              <span className="text-xs md:text-sm">{t("pages.admin")}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 size-3 md:size-4" />
          <span className="text-xs md:text-sm">{t("navbar.log-out")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
