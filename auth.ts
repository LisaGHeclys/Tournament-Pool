import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { getDb } from "@/lib/firebase/firebase";

export const { handlers, auth } = NextAuth({
  providers: [GitHub],
  adapter: FirestoreAdapter(getDb()),
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (!user || !account) {
          console.error("Missing user or account in signIn callback.");
          return false;
        }

        const db = getDb();
        const userId = user.email || account.id || "unknown-user-id";
        const userRef = db.collection("users").doc(userId.toString());
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists) {
          await userRef.set({
            email: user.email || "No email provided",
            isFirstTime: true,
            name: user.name || "Unknown",
          });
        } else {
          const userData = userSnapshot.data();
          if (userData?.isFirstTime) {
            await userRef.update({ isFirstTime: false });
          }
        }

        return true;
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false;
      }
    },

    async session({ session, user }) {
      try {
        const db = getDb();
        const userRef = db.collection("users").doc(user.email || user.id);
        const userSnapshot = await userRef.get();

        if (userSnapshot.exists) {
          const userData = userSnapshot.data();
          session.user.isFirstTime = userData?.isFirstTime || false;
        } else {
          console.warn("User not found in Firestore during session callback.");
          session.user.isFirstTime = false;
        }

        session.user = {
          emailVerified: null,
          id: user.id,
          email: user.email,
          image: user.image,
          name: user.name,
          isFirstTime: session.user.isFirstTime,
        };

        return session;
      } catch (error) {
        console.error("Error during session callback:", error);
        return session;
      }
    },
  },
});
