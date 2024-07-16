import { type NextRequest, NextResponse } from "next/server";

/**
 * checks https://www.chainalysis.com/free-cryptocurrency-sanctions-screening-tools/ for sanctioned addresses
 * @param address
 */
export const isSanctioned = async (address: string) => {
  if (!process.env.CHAINALYSIS_API_KEY) {
    return {
      address,
      isSanctioned: undefined,
    };
  }

  const chainalysisResponse = await (
    await fetch(`https://public.chainalysis.com/api/v1/address/${address}`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.CHAINALYSIS_API_KEY,
      },
    })
  ).json();

  return {
    address,
    isSanctioned: chainalysisResponse.identifications.length > 0,
  };
};
