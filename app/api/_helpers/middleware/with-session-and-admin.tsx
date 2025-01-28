import { auth } from "@/auth";
import { type Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function withSessionAndAdmin(
  req: NextRequest,
  handler: (
    req: NextRequest,
    session?: Session,
    arg?: string,
  ) => Promise<NextResponse>,
  arg?: string,
) {
  const session = await auth();

  if (session && session.user && session.user?.role === "admin")
    return handler(req, session, arg);

  return NextResponse.json(
    { error: "No Admin authenticated." },
    { status: 401 },
  );
}

export default withSessionAndAdmin;
