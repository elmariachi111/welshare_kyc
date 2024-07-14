import { siweServer } from "@/utils/siweServer";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => siweServer.apiRouteHandler(req);
export const POST = async (req: NextRequest) => siweServer.apiRouteHandler(req);
