"use client";
import { z } from "zod";

const updateTournamentSchema = z.object({
  username: z.string().min(2).max(50),
});
