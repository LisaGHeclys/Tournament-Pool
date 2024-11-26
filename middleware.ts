import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (PUBLIC_FILE.test(pathname) || pathname.startsWith("/api")) return;

  const pathnameParts = pathname.split("/");
  const locale = pathnameParts[1];

  const supportedLocales = ["en", "fr", "it"];

  if (!supportedLocales.includes(locale)) {
    const url = req.nextUrl.clone();
    url.pathname = `/fr${pathname}`;
    return NextResponse.redirect(url);
  }
}
