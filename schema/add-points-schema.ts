"use client";
import { z } from "zod";

const addPointsSchema = z.object({
  team: z.object({
    name: z
      .string()
      .min(1, "Team name is required")
      .max(50, "Team name must not exceed 50 characters"),
    color: z.string(),
  }),
  createdBy: z.string(),
  reason: z
    .string()
    .min(1, "Reason is required")
    .max(200, "Reason must not exceed 200 characters"),
  points: z.number().max(1000, "Points must not exceed 1000"),
  createdAt: z.date(),
});

export default addPointsSchema;
