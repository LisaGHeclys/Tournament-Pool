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
import addPointsSchema from "@/schema/add-points-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tournamentBody } from "@/app/api/_helpers/types/types";
import { useSession } from "next-auth/react";
import { useAddPoints } from "@/api/tournaments/use-add-points";
import { useParams } from "next/navigation";

interface AddPointsFormProps {
  data: tournamentBody;
  setOpenPoints: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddPointsForm({ data, setOpenPoints }: AddPointsFormProps) {
  const { data: session } = useSession();
  const id: string | string[] = useParams().id;
  const addPointsMutation = useAddPoints({
    id: Array.isArray(id) ? id[0] : id,
  });
  const form = useForm<z.infer<typeof addPointsSchema>>({
    resolver: zodResolver(addPointsSchema),
    defaultValues: {
      team: {
        name: "",
        color: "",
      },
      reason: "",
      points: 1,
      createdBy: session?.user?.name ?? "",
      createdAt: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof addPointsSchema>) {
    const newTournament = {
      ...data,
      points: Array.isArray(data.points) ? [values, ...data.points] : [values],
    };
    addPointsMutation.mutate(newTournament, {
      onSuccess: () => {
        setOpenPoints(false);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="team"
          render={({ field }) => (
            <FormItem>
              <FormLabel>For which team?</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    const selectedTeam = data.teams.find(
                      (team) => team.name === value,
                    );
                    if (selectedTeam) {
                      form.setValue("team", {
                        name: selectedTeam.name,
                        color: selectedTeam.color,
                      });
                      field.onChange({
                        name: selectedTeam.name,
                        color: selectedTeam.color,
                      });
                    }
                  }}
                >
                  <SelectTrigger id="team-number">
                    <SelectValue placeholder="Choose a team" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {data.teams.map((team, index) => (
                      <SelectItem key={index} value={team.name}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What reason?</FormLabel>
              <FormControl>
                <Input
                  id="reason"
                  placeholder="Write the reason to add points"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="points"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How many points?</FormLabel>
              <FormControl>
                <Input
                  id="points"
                  max={1000}
                  value={field.value}
                  placeholder="How many points do you want to add?"
                  onChange={(e) => {
                    form.setValue("points", Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add point</Button>
      </form>
    </Form>
  );
}
