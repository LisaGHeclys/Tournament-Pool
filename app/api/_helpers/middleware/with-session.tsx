import { auth } from "@/auth";
import { type Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function withSession(
  req: NextRequest,
  handler: (
    req: NextRequest,
    session?: Session,
    arg?: string,
  ) => Promise<NextResponse>,
  arg?: string,
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

  return handler(req, session, arg);
}

export default withSession;
