"use client";

import { Button } from "@nextui-org/button";

import { CheckCircle } from "@phosphor-icons/react";
import { useModal, useSIWE } from "connectkit";
import { useState } from "react";
import SignedInActions from "./SignedinActions";

export default function SignedInFlow({
  referrer,
}: {
  referrer?: string | null;
}) {
  const { setOpen } = useModal();
  const [kycState, setKYCState] = useState<"failed" | "completed">();

  const { isSignedIn } = useSIWE();

  if (kycState === "completed") {
    return (
      <div className="flex flex-col items-center gap-4">
        <CheckCircle fill="#07F1EF" size={128} weight="fill" />
        <p className="w-1/2 text-center text-lg">
          Thank you for identifying! We received your information and will let
          you know how to proceed soon!
        </p>
      </div>
    );
  }

  return (
    <>
      {!isSignedIn && (
        <>
          <p className="text-2xl font-semibold text-center">
            Connect your wallet to get started
          </p>
          <Button
            radius="sm"
            className="bg-gradient-to-br from-[#07F1EF] to-[#3045FF] px-8"
            onClick={() => setOpen(true)}
          >
            Connect Wallet
          </Button>
        </>
      )}
      <p className="text-sm text-gray-400 md:w-1/2 text-center">
        Note: Due to regulatory restrictions, the WEL token will{" "}
        <strong>not be made available to US persons</strong>.
      </p>
      {isSignedIn && (
        <SignedInActions setKYCState={setKYCState} referrer={referrer} />
      )}
    </>
  );
}
