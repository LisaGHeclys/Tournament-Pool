import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase/firebase";
import { Session } from "next-auth";
import { firestoreTimestampToDate } from "@/app/api/_helpers/getDates";
import withSessionAndAdmin from "@/app/api/_helpers/middleware/with-session-and-admin";

async function getHandler(req: NextRequest, session?: Session) {
  try {
    const db = getDb();
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    const tournamentsData = await db
      .collection("tournaments")
      .where("createdAt", ">=", oneYearAgo)
      .orderBy("createdAt", "desc")
      .get();

    if (tournamentsData.empty) return NextResponse.json({ tournaments: {} });

    const tournamentsCountByMonth: Record<string, number> = {};

    tournamentsData.docs.forEach((doc) => {
      const createdAt = firestoreTimestampToDate(doc.data().createdAt);
      const monthKey = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`; // Format: YYYY-MM

      tournamentsCountByMonth[monthKey] =
        (tournamentsCountByMonth[monthKey] || 0) + 1;
    });

    return NextResponse.json({ tournaments: tournamentsCountByMonth });
  } catch (e) {
    console.error("Error fetching tournament counts:", e);
    return NextResponse.json(
      { error: "Failed to fetch tournament counts." },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  return withSessionAndAdmin(req, getHandler);
}
