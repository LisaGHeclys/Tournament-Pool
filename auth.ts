import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { getDb } from "@/lib/firebase/firebase";

export const { handlers, auth } = NextAuth({
  providers: [GitHub],
  adapter: FirestoreAdapter(getDb()),
  //callbacks: {
  // authorized: async ({ auth }) => {
  //   return !!auth;
  // },
  //},
});
