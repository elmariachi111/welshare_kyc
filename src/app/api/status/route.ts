import { NextRequest, NextResponse } from "next/server";
import * as Google from "@googleapis/sheets";

const makeClient = () => {
  const auth = new Google.auth.JWT({
    email: process.env.GOOGLE_SHEETS_SERVICE_CLIENT_EMAIL,
    key: process.env.GOOGLE_SHEETS_SERVICE_CLIENT_PRIVATE_KEY!.replace(
      /\\n/g,
      "\n"
    ),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return Google.sheets({ version: "v4", auth });
};

export const GET = async (req: NextRequest) => {
  const address = req.nextUrl.searchParams.get("address");
  if (!address) {
    return NextResponse.json({ error: "address is required" }, { status: 400 });
  }

  const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_WALLETS_SPREADSHEET_ID;

  const Sheets = makeClient();

  const result = await Sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1!A2:C1250",
  });

  const entry = result.data.values?.find(
    (val: any[3]) => val[0].toLowerCase() === address.toLowerCase()
  );

  if (!entry) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const response = NextResponse.json({
    address: entry?.[0],
    status: entry?.[1],
  });
  return response;
};
