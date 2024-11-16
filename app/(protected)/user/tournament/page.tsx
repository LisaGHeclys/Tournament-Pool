"use client";
import { redirect } from "next/navigation";

export default function RedirectToUser() {
  redirect("/user");
}
