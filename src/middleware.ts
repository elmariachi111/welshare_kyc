import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: "/",
};

// https://orpa.princeton.edu/export-controls/sanctioned-countries

const BLOCKED_COUNTRIES = [
  "CU", // Cuba
  "IR", // Iran, Islamic Republic Of
  "KP", // Korea, Democratic People's Republic Of
  "RU", // Russia
  "SY", // Syrian Arab Republic
  "US", // merica
];

const BLOCKED_REGIONS = [
  "UA-43", // Crimea
  "UA-14", // Donetsk
  "UA-09", // Luhansk
];

const isOFACBlocked = (request: NextRequest) => {
  const country = request?.geo?.country ?? "DE";
  const region = request?.geo?.region ?? undefined;

  return (
    BLOCKED_COUNTRIES.includes(country) ||
    (region && BLOCKED_REGIONS.includes(region))
  );
};

export function middleware(request: NextRequest) {
  if (isOFACBlocked(request)) {
    request.nextUrl.pathname = "/restricted";
    return NextResponse.rewrite(request.nextUrl);
  }

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
