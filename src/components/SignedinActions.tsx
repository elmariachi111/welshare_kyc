"use client";

import { Link } from "@nextui-org/link";
import PersonaFlow from "./PersonaFlow";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@nextui-org/button";

export default function SignedInActions({
  setKYCState,
  referrer,
}: {
  setKYCState: Dispatch<SetStateAction<"completed" | "failed" | undefined>>;
  referrer?: string | null;
}) {
  return (
    <div className="flex flex-col items-start gap-12 text-sm">
      <div className="flex flex-col md:flex-row bg-zinc-800 p-8 rounded-2xl gap-6 items-center">
        <div className="mt-[-4rem] md:ml-[-4rem] md:mt-0">
          <div className="w-16 h-16 rounded-full flex justify-center items-center bg-primary text-2xl text-black">
            1
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xl font-bold">Purchase Vouchers</p>
          <p>
            Important: Use this connected wallet for purchase. Go to
            <Link href="https://www.juicebox.money/@welshare">
              www.juicebox.money/@welshare
            </Link>{" "}
            to purchase your desired amount of vouchers. Note: These are not the
            WEL tokens. The WEL tokens will be distributed to people who are
            accepted to purchase. To apply, complete step 2.{" "}
          </p>
        </div>
        <div>
          <Button
            radius="sm"
            className="bg-gradient-to-br from-[#07F1EF] to-[#3045FF] px-12"
          >
            Purchase Vouchers
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row bg-zinc-800 p-8 rounded-2xl gap-6 items-center w-full">
        <div className="mt-[-4rem] md:ml-[-4rem] md:mt-0">
          <div className="w-16 h-16 rounded-full flex justify-center items-center bg-primary text-2xl text-black">
            2
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xl font-bold">Apply for WEL Token</p>
          <p>
            Follow the KYC process. You will need your ID and will be required
            to take a selfie.
          </p>
        </div>
        <div>
          <PersonaFlow
            referrer={referrer}
            onComplete={(inquiryId: string, status: string, fields: any) => {
              console.log("PERSONA", { inquiryId, status, fields });
              setKYCState("completed");
            }}
          />
        </div>
      </div>

      <p>
        Upon completion of these steps, your WEL token purchase application will
        be reviewed. If successful, you will receive the WEL token after TGE
        (20% at TGE, 1-month cliff, then 6-month linear vesting). If
        unsuccessful, you can return the voucher on juicebox for a refund.
      </p>
    </div>
  );
}
