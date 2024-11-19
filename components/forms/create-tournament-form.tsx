"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import createTournamentSchema from "@/schema/create-tournament-schema";
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
import { Label } from "@/components/ui/label";
import { ColorPicker } from "@/components/ui/color-picker";
import { useSession } from "next-auth/react";
import { tournamentBody } from "@/types/types";
import { useCreateTournament } from "@/api";
import { useRouter } from "next/navigation";

interface CreateTournamentFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateTournamentForm({ setOpen }: CreateTournamentFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const createTournamentMutation = useCreateTournament({
    router: router,
    closeModal: () => setOpen(false),
  });
  const form = useForm<z.infer<typeof createTournamentSchema>>({
    resolver: zodResolver(createTournamentSchema),
    defaultValues: {
      name: "",
      teamNumber: 2,
      teams: [
        { name: "", color: "" },
        { name: "", color: "" },
      ],
    },
  });

  const handleTeamNumberChange = (
    value: number,
    tempData: z.infer<typeof createTournamentSchema>,
  ) => {
    if (value >= 2 && value <= 5) {
      let updatedTeams = [...tempData.teams];

      if (value > updatedTeams.length) {
        updatedTeams = [
          ...updatedTeams,
          ...Array.from({ length: value - updatedTeams.length }, () => ({
            name: "",
            color: "",
          })),
        ];
      } else {
        updatedTeams = updatedTeams.slice(0, value);
      }
      form.setValue("teams", updatedTeams, { shouldValidate: true });
    }
  };

  function onSubmit(values: z.infer<typeof createTournamentSchema>) {
    const newTournament: tournamentBody = {
      name: values.name,
      teams: values.teams,
      points: [],
      createdBy: session?.user?.name ?? "",
      createdAt: new Date(),
    };
    createTournamentMutation.mutate(newTournament);
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
                <Input placeholder="Your tournament name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teamNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How many teams do you need?</FormLabel>
              <FormControl>
                <Input
                  id="teamNumber"
                  type="number"
                  min="1"
                  placeholder="Your number of teams"
                  value={field.value}
                  onChange={(e) => {
                    const value = Math.max(
                      2,
                      Math.min(5, Number(e.target.value)),
                    );
                    handleTeamNumberChange(Number(value), form.getValues());
                    form.setValue("teamNumber", Number(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teams"
          render={() => {
            const teams = form.watch("teams"); // Use watch to reactively track changes
            return (
              <FormItem>
                <FormControl>
                  <div className="space-y-4">
                    {teams.map((team, index) => (
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
                              const newTeams = [...teams];
                              newTeams[index] = {
                                ...newTeams[index],
                                name: e.target.value,
                              };
                              form.setValue("teams", newTeams, {
                                shouldValidate: true,
                              });
                            }}
                            placeholder="Team name"
                            required
                          />
                          <div>
                            <ColorPicker
                              id={`team-${index}-color`}
                              value={team.color}
                              onChange={(v) => {
                                const newTeams = [...teams];
                                newTeams[index] = {
                                  ...newTeams[index],
                                  color: v,
                                };
                                form.setValue("teams", newTeams, {
                                  shouldValidate: true,
                                });
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
            );
          }}
        />
        <Button type="submit">Create a tournament</Button>
      </form>
    </Form>
  );
}
