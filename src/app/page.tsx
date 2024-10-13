import Countdown from "@/components/Countdown";
import SignedInFlow from "@/components/SignedInFlow";
import { cookies } from "next/headers";

export default function Home() {
  const referrer = cookies().get("referrer")?.value;

  //todo: make 2 countdowns, one until sale stars, then one until sale ends
  return (
    <div className="flex flex-col items-center justify-center gap-8 ">
      <Countdown targetDate="2024-10-16T17:00:00" />

      <SignedInFlow referrer={referrer} />
    </div>
  );
}
