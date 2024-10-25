import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase/firebase";
import withSession from "@/app/api/_helpers/middleware/with-session";
import { Session } from "next-auth";
import { tournamentBody } from "@/app/api/_helpers/types/types";

async function getHandler(req: NextRequest, session?: Session) {
  try {
    const tournamentsData = await getDb()
      .collection("tournaments")
      .where("createdBy", "==", session?.user?.name || "")
      .get();

    if (tournamentsData.empty) return NextResponse.json({ tournaments: [] });

    const tournaments = tournamentsData.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: new Date(data.createdAt.toDate()),
      } as tournamentBody;
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
