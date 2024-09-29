import { isSanctioned } from "@/lib/chainalysis";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const address = req.nextUrl.searchParams.get("address");
  if (!address) {
    return NextResponse.json({ error: "address is required" }, { status: 400 });
  }
  const result = await isSanctioned(address);
  return NextResponse.json(result);
};
