import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase/firebase";
import withSession from "@/app/api/_helpers/middleware/with-session";
import { tournamentBody } from "@/app/api/_helpers/types/types";
import { Session } from "next-auth";

async function getHandler(req: NextRequest, session?: Session) {
  try {
    const tournamentsData = await getDb()
      .collection("tournaments")
      .where("createdBy", "==", session?.user?.name || "")
      .get();

    let tournaments: tournamentBody[] = [];

    if (!tournamentsData) return NextResponse.json({ tournaments });

    tournaments = tournamentsData.docs.map((doc) => ({
      ...doc.data(),
    }));

    return NextResponse.json({ tournaments });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return withSession(req, getHandler);
}
