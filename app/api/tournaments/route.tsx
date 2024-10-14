import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase/firebase";
import withSession from "@/app/api/_helpers/middleware/with-session";
import { tournamentBody } from "@/app/api/_helpers/types/interfaces";
import { Session } from "next-auth";

async function putHandler(req: NextRequest, session?: Session) {
  const body: tournamentBody = JSON.parse(await req.text());
  const { name, teams, createdBy } = body;

  if (!name)
    return NextResponse.json(
      { error: "Name of tournament is required" },
      { status: 400 },
    );

  if (teams?.length < 2 || !teams)
    return NextResponse.json(
      { error: "Insufficient teams must be greater than 2 teams." },
      { status: 400 },
    );

  teams.forEach((team) => {
    if (!team?.name)
      return NextResponse.json(
        { error: "Name of a team is required" },
        { status: 400 },
      );
    if (!team?.color)
      return NextResponse.json(
        { error: "Color of a team is required" },
        { status: 400 },
      );
  });

  try {
    const document = await getDb().collection("tournaments").add({
      name,
      teams,
      createdBy,
    });
    const user = await getDb()
      .collection("users")
      .where("id", "==", session?.user?.id || "")
      .get();
    const userData = user.docs[0].data();

    let tournamentsId = userData.tournamentsId;
    if (!tournamentsId) tournamentsId = [];

    tournamentsId.unshift(document.id);

    await getDb()
      .collection("users")
      .doc(session?.user?.id || "")
      .update({
        tournamentsId: tournamentsId,
      });

    return NextResponse.json({ id: document.id });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  return withSession(req, putHandler);
}
