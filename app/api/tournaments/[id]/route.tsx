import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase/firebase";
import withSession from "@/app/api/_helpers/middleware/with-session";
import { tournamentBody } from "@/app/api/_helpers/types/types";

async function getHandler(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const id = params.get("id");

  if (!id)
    return NextResponse.json({ error: "Id is required" }, { status: 500 });

  try {
    const tournament = await getDb()
      .collection("tournaments")
      .doc(id)
      .get()
      .then((doc) => ({ ...doc.data() }) as tournamentBody);

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

async function deleteHandler(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const id = params.get("id");

  if (!id)
    return NextResponse.json({ error: "Id is required" }, { status: 500 });

  try {
    await getDb().collection("tournaments").doc(id).delete();
    return NextResponse.json({});
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return withSession(req, getHandler);
}

export async function POST(req: NextRequest) {
  return withSession(req, getHandler);
}

export async function DELETE(req: NextRequest) {
  return withSession(req, deleteHandler);
}
