import { NextRequest, NextResponse } from "next/server";

const QUERY = `query Participant($participant:ID!) {
  participant(id:$participant) {
    id
    project {
        id
      }
      projectId
      address
      volume
      volumeUSD
      balance
      paymentsCount
      stakedBalance
  }
}`;

export const GET = async (req: NextRequest) => {
  const projectId = process.env.JB_PROJECT_ID;
  const JB_SUBGRAPH_ENDPOINT = process.env.JB_SUBGRAPH_ENDPOINT!;
  const address = req.nextUrl.searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "address is required" }, { status: 400 });
  }
  const participantId = `${projectId}-${address.toLowerCase()}`;
  const result = await fetch(JB_SUBGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      Origin: "https://juicebox.money",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: {
        participant: participantId,
      },
    }),
  });

  return NextResponse.json(await result.json(), {
    status: result.status,
  });
};
