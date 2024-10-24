import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase/firebase";
import withSession from "@/app/api/_helpers/middleware/with-session";
import { tournamentBody } from "@/app/api/_helpers/types/types";
import { Session } from "next-auth";

async function getHandler(
  req: NextRequest,
  session?: Session,
  argument?: string,
) {
  const id = argument;

  if (!id)
    return NextResponse.json({ error: "Internal error" }, { status: 500 });

  try {
    const tournament = await getDb()
      .collection("tournaments")
      .doc(id)
      .get()
      .then((doc) => ({ id: doc.id, ...doc.data() }) as tournamentBody);

    if (!tournament)
      return NextResponse.json(
        { error: "Tournament not found" },
        { status: 404 },
      );

    return NextResponse.json({ ...tournament });
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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return withSession(req, getHandler, params.id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  return withSession(req, deleteHandler, params.id);
}
