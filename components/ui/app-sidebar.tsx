import { Home, Swords, UsersRound } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import * as React from "react";
import { useSession } from "next-auth/react";
import { NavUser } from "@/components/admin/nav-user";
import { useLocale } from "next-intl";

export function AppSidebar() {
  const { data: session } = useSession();
  const locale = useLocale();

  const items = {
    nav: [
      {
        title: "Dashboard",
        url: `/admin/dashboard`,
        icon: Home,
      },
      {
        title: "Users",
        url: `/admin/users`,
        icon: UsersRound,
      },
      {
        title: "Tournaments",
        url: `/admin/tournaments`,
        icon: Swords,
      },
    ],
  };

  return (
    <Sidebar collapsible={"icon"}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a
                href={`/${locale}/`}
                className={"hover:scale-[102%] transition ease-in-out delay-50"}
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image
                    alt="Logo TP"
                    src="/logo-tp-light.ico"
                    width={"28"}
                    height={"28"}
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Tournament-Pool</span>
                  <span className="">v0.1.3</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarMenu>
            {items.nav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
