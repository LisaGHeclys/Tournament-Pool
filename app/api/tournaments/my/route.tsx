import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase/firebase";
import withSession from "@/app/api/_helpers/middleware/with-session";
import { Session } from "next-auth";
import { tournamentBody } from "@/types/types";
import { firestoreTimestampToDate } from "@/app/api/_helpers/getDates";

async function getHandler(req: NextRequest, session?: Session) {
  try {
    const tournamentsData = await getDb()
      .collection("tournaments")
      .where("createdBy", "==", session?.user?.name || "")
      .get();

    if (tournamentsData.empty) return NextResponse.json({ tournaments: [] });

    const tournaments = tournamentsData.docs.map((doc) => {
      const data = doc.data() as tournamentBody;
      return {
        id: doc.id,
        ...data,
        createdAt: firestoreTimestampToDate(data.createdAt),
      };
    });

    tournaments.sort(
      (a: tournamentBody, b: tournamentBody) =>
        b.createdAt.getTime() - a.createdAt.getTime(),
    );
    return NextResponse.json({ tournaments: tournaments });
  } catch (e) {
    console.error("Error fetching tournaments of one user:", e);
    return NextResponse.json(
      { error: "Failed to fetch tournaments of one user." },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  return withSession(req, getHandler);
}
