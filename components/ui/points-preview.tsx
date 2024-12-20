import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { pointsBody } from "@/types/types";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";

type PointsPreviewProps = {
  isShowing?: boolean;
  point: pointsBody;
  handleRemovePointsToTournament?: (
    targetCreatedAt: Date,
    setOpenDeletePoint: React.Dispatch<React.SetStateAction<boolean>>,
  ) => Promise<void>;
};

export default function PointsPreview({
  isShowing = false,
  point,
  handleRemovePointsToTournament,
}: PointsPreviewProps) {
  const [openDeletePoint, setOpenDeletePoint] = React.useState(false);
  const t = useTranslations();

  return (
    <Card className="w-full h-full flex justify-between drop-shadow-lg dark:shadow-white">
      <CardHeader className="w-full gap-2 items-start justify-between flex">
        <div className="w-[160px] sm:w-full flex gap-2 items-start flex-col">
          {isShowing ? (
            <div className="w-full flex items-center justify-between rounded-sm ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <CardTitle className="font-extrabold">{point.reason}</CardTitle>
              <CardTitle>{point.points}</CardTitle>
            </div>
          ) : (
            <>
              <div className="w-full flex items-center justify-between rounded-sm ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <CardTitle className="font-extrabold">{point.reason}</CardTitle>
                <Dialog
                  open={openDeletePoint}
                  onOpenChange={setOpenDeletePoint}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="rounded-full hover:scale-115 transition ease-in-out delay-250"
                      variant="ghost"
                      size="icon"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col rounded-md max-w-[280px] sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>
                        {t("forms.tournament.delete-title")}
                        {point.reason}
                      </DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this point ?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setOpenDeletePoint(false)}
                      >
                        {t("forms.tournament.cancel")}
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() =>
                          handleRemovePointsToTournament &&
                          handleRemovePointsToTournament(
                            point.createdAt,
                            setOpenDeletePoint,
                          )
                        }
                      >
                        {t("forms.tournament.confirm-delete")}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="w-full flex gap-2 items-start flex-col md:flex-row justify-between">
                <CardTitle>{point.points}</CardTitle>
              </div>
            </>
          )}
          <Separator />
        </div>
        <span className="flex items-center text-center text-xs md:text-sm gap-2">
          <Avatar className="h-4 w-4 md:h-8 md:w-8">
            <AvatarFallback style={{ backgroundColor: point.team.color }} />
          </Avatar>
          <span className="font-semibold">{point.team.name}</span>
        </span>
        <span className="flex text-xs md:text-sm">
          {t("tournament.created-by")}
          {point.createdBy}
        </span>
      </CardHeader>
    </Card>
  );
}
