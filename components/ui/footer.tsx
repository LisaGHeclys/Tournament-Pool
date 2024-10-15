import { CalendarDays, Copyright, Github, Globe } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Footer() {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button className="flex items-center gap-2" variant="link">
            <Copyright width={16} height={16} />
            All rights reserved
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
                LisaGHeclys · she/her
              </h4>
              <p className="text-sm">
                Mobile & Frontend dev crafting sleek, fun user experiences.
                UI/UX enthusiast from France !
              </p>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  Joined September 28, 2020
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/LisaGHeclys"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github width={16} height={16} />
        Github
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://lisamlglaziou.fr"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Globe width={16} height={16} />
        Go see my other projects →
      </a>
    </footer>
  );
}
