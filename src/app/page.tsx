import SignedInFlow from "@/components/SignedInFlow";
import { Spacer } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-16 ">
      <h1 className="text-3xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#2DE1FB] to-[#086BFA]">
        Public Pre-sale Phase I{" "}
      </h1>

      <SignedInFlow />
      <Spacer y={12} />
    </div>
  );
}
