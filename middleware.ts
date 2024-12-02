import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (PUBLIC_FILE.test(pathname) || pathname.startsWith("/api")) return;

  const pathnameParts = pathname.split("/");
  const locale = pathnameParts[1];
  const url = req.nextUrl.clone();

  const supportedLocales = ["en", "fr", "it"];

  if (!supportedLocales.includes(locale)) {
    url.pathname = `/fr${pathname}`;
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  response.cookies.set("locale", locale);
  return response;
}
