import SignedInFlow from "@/components/SignedInFlow";
import { cookies } from "next/headers";

export default function Home() {
  const referrer = cookies().get("referrer");

  return (
    <div className="flex flex-col items-center justify-center gap-16 ">
      <SignedInFlow referrer={referrer?.value} />
    </div>
  );
}
