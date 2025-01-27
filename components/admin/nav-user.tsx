"use client";
import { BookLock, ChevronsUpDown, LifeBuoy, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import React from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

export function NavUser({
  user,
}: {
  user:
    | {
        name: string;
        email: string;
        image: string;
      }
    | undefined;
}) {
  const { isMobile } = useSidebar();
  const { toast } = useToast();
  const router = useRouter();
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
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={user?.image} alt={user?.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={user?.image} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
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
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 size-3 md:size-4" />
              <span className="text-xs md:text-sm">{t("navbar.log-out")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
