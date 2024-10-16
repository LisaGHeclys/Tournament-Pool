import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase/firebase";
import withSession from "@/app/api/_helpers/middleware/with-session";
import { Session } from "next-auth";

async function getHandler(req: NextRequest, session?: Session) {
  try {
    const tournamentsData = await getDb()
      .collection("tournaments")
      .where("createdBy", "==", session?.user?.name || "")
      .get();

    let tournaments = [];

    if (tournamentsData.empty) return NextResponse.json({ Array });

    tournaments = tournamentsData.docs.map((doc) => ({
      ...doc.data(),
    }));

    return NextResponse.json({ tournaments: tournaments });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return withSession(req, getHandler);
}
