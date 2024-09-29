"use client";

import { Button } from "@nextui-org/button";

import { useModal, useSIWE } from "connectkit";
import { useState } from "react";
import SignedInActions from "./SignedinActions";

export default function SignedInFlow({
  referrer,
}: {
  referrer?: string | null;
}) {
  const { setOpen } = useModal();
  const [kycState, setKYCState] = useState<
    "failed" | "completed" | "not-started" | "not-finalized" | undefined
  >();

  const { isSignedIn } = useSIWE();

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
      <p className="text-lg text-gray-400 sm:w-2/3 text-center ">
        Note: Due to regulatory restrictions, the WEL token will{" "}
        <br className="hidden sm:inline" />
        <strong>not be made available to US persons</strong>.
      </p>
      {isSignedIn && (
        <SignedInActions
          kycState={kycState}
          setKYCState={setKYCState}
          referrer={referrer}
        />
      )}
    </>
  );
}
