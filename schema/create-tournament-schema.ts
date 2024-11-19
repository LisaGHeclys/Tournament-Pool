"use client";
import { z } from "zod";

const createTournamentSchema = z.object({
  name: z
    .string()
    .min(2, "Tournament name must be at least 2 characters long")
    .max(50, "Tournament name must not exceed 50 characters"),
  teamNumber: z
    .number()
    .min(2, "You need at least 2 teams")
    .max(5, "You can have a maximum of 5 teams"),
  teams: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, "Team name is required")
          .max(30, "Team name must not exceed 30 characters"),
        color: z
          .string()
          .regex(/^#[0-9A-Fa-f]{6}$/, "Color must be a valid hex code"),
      }),
    )
    .min(2, "You must specify details for at least 2 teams")
    .max(5, "You can specify details for a maximum of 5 teams"),
});

export default createTournamentSchema;
