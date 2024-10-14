import Countdown from "@/components/Countdown";
import SignedInFlow from "@/components/SignedInFlow";
import { cookies } from "next/headers";
import { COUNTDOWN_STARTS, PHASE3_ENDS, PHASE3_STARTS } from "./constants";

export default function Home() {
  const referrer = cookies().get("referrer")?.value;

  const now = new Date().getTime();

  let countdown: JSX.Element | null = null;
  if (now > COUNTDOWN_STARTS) {
    if (now < PHASE3_STARTS) {
      countdown = (
        <Countdown targetDate={new Date(PHASE3_STARTS)}>
          until phase 3 starts
        </Countdown>
      );
    } else if (now < PHASE3_ENDS) {
      countdown = (
        <Countdown targetDate={new Date(PHASE3_ENDS)}>
          until phase 3 ends
        </Countdown>
      );
    } else {
      countdown = null;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 ">
      {countdown}

      <SignedInFlow referrer={referrer} />
    </div>
  );
}
