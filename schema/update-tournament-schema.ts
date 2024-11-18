"use client";
import { z } from "zod";

const updateTournamentSchema = z.object({
  name: z.string(),
  teams: z.array(
    z.object({
      name: z
        .string()
        .min(1, "Team name is required")
        .max(50, "Team name must not exceed 50 characters"),
      color: z.string(),
    }),
  ),
});

export default updateTournamentSchema;
