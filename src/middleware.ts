import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: "/",
};

export function middleware(request: NextRequest) {
  const ref = request.nextUrl.searchParams.get("ref");
  if (!ref) {
    return NextResponse.next();
  }

  const nextUrl = request.nextUrl.clone();
  nextUrl.searchParams.delete("ref");

  const response = NextResponse.redirect(nextUrl);
  response.cookies.set({
    name: "referrer",
    value: ref,
  });
  return response;
}
