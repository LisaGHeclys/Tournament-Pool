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

export function CreateTournamentForm() {
  const form = useForm<z.infer<typeof createTournamentSchema>>({
    resolver: zodResolver(createTournamentSchema),
    defaultValues: {
      name: "",
      teamNumber: 2,
      teams: [],
    },
  });

  function onSubmit(values: z.infer<typeof createTournamentSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
              <FormLabel>How many teams do you need ?</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Your number of teams"
                  {...field}
                />
                {/*<Input placeholder="Your tournament name" required {...field} />*/}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create a tournament</Button>
      </form>
    </Form>
  );
}
