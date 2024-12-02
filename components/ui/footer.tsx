import { CalendarDays, Copyright, Github, Globe } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="h-fit row-start-3 flex gap-2 flex-wrap items-center justify-center">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            className="px-2 py-1 sm:px-4 sm:py-2 text-xs md:text-sm flex items-center gap-2"
            variant="link"
          >
            <Copyright width={16} height={16} />
            {t("footer.rights")}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/72012368?v=4" />
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Lisopaïne</h4>
              <h4 className="text-xs text-muted-foreground font-medium">
                LisaGHeclys · {t("me.pronouns")}
              </h4>
              <p className="text-sm">{t("me.description")}</p>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-xs text-muted-foreground">
                  {t("me.joined")}
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      <a
        className="px-2 py-1 sm:px-4 sm:py-2 text-xs md:text-sm rounded-md h-full flex items-center gap-2 hover:underline hover:underline-offset-4 font-medium"
        href="https://github.com/LisaGHeclys"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github width={16} height={16} />
        Github
      </a>
      <a
        className="px-2 py-1 sm:px-4 sm:py-2 text-xs md:text-sm rounded-md h-full flex items-center gap-2 hover:underline hover:underline-offset-4 font-medium"
        href="https://lisamlglaziou.fr"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Globe width={16} height={16} />
        {t("footer.other-projects")} →
      </a>
    </footer>
  );
}
