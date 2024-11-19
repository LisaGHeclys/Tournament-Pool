"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { tournamentBody } from "@/app/api/_helpers/types/types";
import { useParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import updateTournamentSchema from "@/schema/update-tournament-schema";
import { ColorPicker } from "@/components/ui/color-picker";
import { Label } from "@/components/ui/label";
import { useDeleteTournament, useEditTournament } from "@/api";

interface EditTournamentFormProps {
  data: tournamentBody;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditTournamentForm({
  data,
  setOpenEdit,
}: EditTournamentFormProps) {
  const router = useRouter();
  const id: string | string[] = useParams().id;
  const [openDelete, setOpenDelete] = React.useState(false);
  const [updatedTournament, setUpdatedTournament] =
    React.useState<tournamentBody>(data);
  const editTournamentMutation = useEditTournament({
    id: Array.isArray(id) ? id[0] : id,
  });
  const deleteTournamentMutation = useDeleteTournament({
    router: router,
    closeModal: () => setOpenDelete(false),
  });

  async function handleDeleteTournament(id: string) {
    deleteTournamentMutation.mutateAsync(id);
  }

  const form = useForm<z.infer<typeof updateTournamentSchema>>({
    resolver: zodResolver(updateTournamentSchema),
    defaultValues: {
      name: data.name,
      teams: data.teams,
    },
  });

  const handleTeamChange = (
    index: number,
    field: "name" | "color",
    value: string,
  ) => {
    const newUpdatedTeams = updatedTournament.teams.map((team, i) =>
      i === index ? { ...team, [field]: value } : team,
    );

    const newUpdatedPoints = updatedTournament.points?.map((point) => {
      if (point.team.name === updatedTournament.teams[index].name) {
        return {
          ...point,
          team: {
            ...point.team,
            [field]: value,
          },
        };
      }
      return point;
    });

    setUpdatedTournament((prev) => ({
      ...prev,
      teams: newUpdatedTeams,
      points: newUpdatedPoints,
    }));
  };

  function onSubmit(values: z.infer<typeof updateTournamentSchema>) {
    const newTournament = {
      ...data,
      teams: values.teams,
      points: updatedTournament.points,
    };
    editTournamentMutation.mutate(newTournament, {
      onSuccess: () => {
        setOpenEdit(false);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tournament Name</FormLabel>
              <FormControl>
                <Input id="name" disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teams"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-4">
                  {field.value.map((team, index) => (
                    <div
                      key={index}
                      className="flex w-full flex-col space-y-1.5"
                    >
                      <Label htmlFor={`team-${index}-name`}>
                        Team {index + 1}: Name and Color
                      </Label>
                      <div className="flex flex-row gap-4">
                        <Input
                          id={`team-${index}-name`}
                          value={team.name}
                          onChange={(e) => {
                            const newName = e.target.value;
                            form.setValue(`teams.${index}.name`, newName, {
                              shouldValidate: true,
                            });
                            handleTeamChange(index, "name", newName);
                          }}
                          placeholder="Team name"
                          required
                        />
                        <div>
                          <ColorPicker
                            id={`team-${index}-color`}
                            value={team.color}
                            onChange={(v) => {
                              form.setValue(`teams.${index}.color`, v, {
                                shouldValidate: true,
                              });
                              handleTeamChange(index, "color", v);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col rounded-md max-w-[280px] sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete {data.name}</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this tournament ?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-between">
                <Button variant="outline" onClick={() => setOpenDelete(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() =>
                    handleDeleteTournament(Array.isArray(id) ? id[0] : id)
                  }
                >
                  Confirm delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button type="submit" variant="outline">
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
}
