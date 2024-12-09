import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    isFirstTime?: boolean;
  }

  interface Session {
    user: {
      isFirstTime?: boolean;
    } & DefaultSession["user"];
  }
}
