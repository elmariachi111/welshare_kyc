import { NextRequest, NextResponse } from "next/server";
import * as Google from "@googleapis/sheets";
import { createHmac, timingSafeEqual } from "node:crypto";
import { isSanctioned } from "@/lib/chainalysis";

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

export const POST = async (req: NextRequest) => {
  const body = await req.text();
  const { data } = JSON.parse(body);
  //const { data } = await req.json();
  //console.log(body);
  const personaHeaders = req.headers.get("persona-signature");
  if (!personaHeaders) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const t = personaHeaders.split(",")[0].split("=")[1];
  const signatures = personaHeaders
    .split(" ")
    .map((pair: string) => pair.split("v1=")[1]);
  const hmac = createHmac("sha256", process.env.PERSONA_WEBHOOK_SECRET!)
    .update(`${t}.${body}`)
    .digest("hex");

  const isVerified = signatures.some((signature) => {
    return timingSafeEqual(Buffer.from(hmac), Buffer.from(signature));
  });

  if (!isVerified) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const payload = data.attributes.payload.data;

  const submission = {
    InquiryId: payload.id,
    CryptoWallet: payload.attributes.fields.cryptoWalletAddress.value,
    SelectedCountry: payload.attributes.fields.selectedCountryCode.value,
    AddressCountry: payload.attributes.fields.addressCountryCode.value,
    EMail: payload.attributes.fields.emailAddress.value,
    Referrer: payload.attributes.fields.referrer.value,
    Status: payload.attributes.status,
  };
  const sanctionResult = await isSanctioned(submission.CryptoWallet);

  const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  const Sheets = makeClient();
  const result = await Sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Persona!A2:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          submission.CryptoWallet,
          submission.InquiryId,
          submission.AddressCountry,
          submission.SelectedCountry,
          submission.EMail,
          submission.Referrer,
          submission.Status,
          sanctionResult.isSanctioned ? "Yes" : "No",
          new Date().toUTCString(),
        ],
      ],
    },
  });
  const response = new NextResponse("ok", { status: 200 });
  return response;
};
