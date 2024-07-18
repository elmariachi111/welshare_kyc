import SignedInFlow from "@/components/SignedInFlow";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Welshare Presale Phase 1",
  description: "Welshare Presale Phase 1",
};

export default function Home() {
  const referrer = cookies().get("referrer")?.value;

  return (
    <div className="flex flex-col items-center justify-center gap-8 ">
      <SignedInFlow referrer={referrer} />
    </div>
  );
}
