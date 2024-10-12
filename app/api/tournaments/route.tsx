import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase/firebase";
import withSession from "@/app/api/_helpers/middleware/with-session";
import { tournamentBody } from "@/app/api/_helpers/types/interfaces";

async function putHandler(req: NextRequest) {
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
    await getDb().collection("tournaments").add({
      name,
      teams,
      createdBy,
    });
    return NextResponse.json({});
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  return withSession(req, putHandler);
}
