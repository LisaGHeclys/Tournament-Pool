import NextAuth, { DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { getDb } from "@/lib/firebase/firebase";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role?: string | null;
  }
}

export const { handlers, auth } = NextAuth({
  providers: [GitHub],
  adapter: FirestoreAdapter(getDb()),
  callbacks: {
    async session({ session, user }) {
      session.user.role = user.role;

      return session;
    },
  },
});
