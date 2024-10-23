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

    const tournaments = tournamentsData.docs
      .map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as tournamentBody,
      )
      .sort(
        (a, b) => b.createdAt.getMilliseconds() - a.createdAt.getMilliseconds(),
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
