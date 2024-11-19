import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase/firebase";
import withSession from "@/app/api/_helpers/middleware/with-session";
import { pointsBody, tournamentBody } from "@/types/types";
import { Session } from "next-auth";
import { firestoreTimestampToDate } from "@/app/api/_helpers/getDates";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  if (!id)
    return NextResponse.json({ error: "Internal error" }, { status: 500 });

  try {
    const tournament = await getDb()
      .collection("tournaments")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data() as tournamentBody;
        return {
          id: doc.id,
          ...data,
          createdAt: firestoreTimestampToDate(data.createdAt),
          points: data.points?.map((point) => ({
            ...point,
          })) as pointsBody[],
        };
      });

    if (!tournament.name)
      return NextResponse.json(
        { error: "Tournament not found" },
        { status: 404 },
      );

    return NextResponse.json({ ...tournament });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

async function patchHandler(
  req: NextRequest,
  session?: Session,
  argument?: string,
) {
  const id = argument;
  const body: tournamentBody = JSON.parse(await req?.text());
  const { name, teams, points } = body;

  if (!id)
    return NextResponse.json({ error: "Internal error" }, { status: 500 });

  try {
    await getDb().collection("tournaments").doc(id).update({
      name,
      teams,
      points,
    });
    return NextResponse.json({});
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

async function deleteHandler(
  req: NextRequest,
  session?: Session,
  argument?: string,
) {
  const id = argument;

  if (!id)
    return NextResponse.json({ error: "Internal error" }, { status: 500 });

  try {
    await getDb().collection("tournaments").doc(id).delete();
    return NextResponse.json({});
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return withSession(req, patchHandler, params.id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return withSession(req, deleteHandler, params.id);
}
