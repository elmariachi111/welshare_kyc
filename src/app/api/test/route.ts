import { siweServer } from "@/utils/siweServer";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const session = await siweServer.getSession();
  return NextResponse.json(session);
};
