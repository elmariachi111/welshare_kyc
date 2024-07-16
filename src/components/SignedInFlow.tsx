"use client";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { CheckCircle } from "@phosphor-icons/react";
import { useModal, useSIWE } from "connectkit";
import { useState } from "react";
import PersonaFlow from "./PersonaFlow";

export default function SignedInFlow({
  referrer,
}: {
  referrer?: string | null;
}) {
  const { setOpen } = useModal();
  const [kycState, setKycState] = useState<"failed" | "completed">();

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
        <div className="flex flex-col items-start gap-8 text-sm">
          <p>INSTRUCTIONS:</p>
          <p>
            1. Go to{" "}
            <Link href="https://www.juicebox.money/welshare" target="_blank">
              www.juicebox.money/welshare
            </Link>{" "}
            to purchase your desired amount of vouchers. Note: These are not the
            WEL token. The WEL token will be distributed to people who
            successfully complete registration and are accepted to participate
            in the whitelist pre-sale.
          </p>
          <p>
            2. Follow the KYC process. You will need your ID and will be
            required to take a selfie.
          </p>
          <p>
            Upon completion of these steps, your WEL token purchase application
            will be reviewed. If successful, you will receive the WEL token
            after TGE (20% at TGE, 1-month cliff, then 6-month linear vesting).
            If unsuccessful, you can return the voucher on juicebox for a
            refund.
          </p>
          <div className="self-center">
            <PersonaFlow
              referrer={referrer}
              onComplete={(inquiryId: string, status: string, fields: any) => {
                setKycState("completed");
                //console.log("COMPLETE: ", { inquiryId, status, fields });
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
