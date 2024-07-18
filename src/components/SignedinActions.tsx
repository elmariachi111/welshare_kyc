"use client";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { XCircle } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";
import PersonaFlow from "./PersonaFlow";

export default function SignedInActions({
  kycState,
  setKYCState,
  referrer,
}: {
  kycState?: "failed" | "completed";
  setKYCState: Dispatch<SetStateAction<"completed" | "failed" | undefined>>;
  referrer?: string | null;
}) {
  return (
    <>
      <div className="flex flex-col items-start gap-12 text-sm pl-0 md:pl-12 mt-8 md:mt-0">
        <div className="flex flex-col md:flex-row bg-zinc-800 p-6 rounded-2xl gap-8 items-center w-full">
          <div className="mt-[-3.5rem] md:ml-[-3.5rem] md:mt-0">
            <div className="w-16 h-16 rounded-full flex justify-center items-center bg-primary text-2xl text-black">
              1
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full justify-stretch items-center gap-8">
            <div className="flex flex-col flex-grow space-y-2 md:w-3/4 ">
              <p className="text-xl font-bold">Purchase Vouchers</p>
              <p>
                <strong>
                  Important: Use this connected wallet for purchase.
                </strong>{" "}
                Go to{" "}
                <Link href="https://www.juicebox.money/@welshare" isExternal>
                  www.juicebox.money/@welshare
                </Link>{" "}
                to purchase your desired amount of vouchers. Note: These are not
                the WEL tokens. The WEL tokens will be distributed to people who
                are accepted to purchase. To apply, complete step 2.{" "}
              </p>
            </div>
            <div className="flex md:w-1/4 ">
              <Button
                radius="sm"
                size="lg"
                className="w-full bg-gradient-to-br from-[#07F1EF] to-[#3045FF] px-12"
                as={Link}
                href="https://www.juicebox.money/@welshare"
                isExternal
              >
                Purchase Vouchers
              </Button>
            </div>
          </div>
        </div>

        {kycState !== "completed" && (
          <>
            <div className="flex flex-col md:flex-row bg-zinc-800 p-6 rounded-2xl gap-4 items-center w-full">
              <div className="mt-[-3.5rem] md:ml-[-3.5rem] md:mt-0">
                <div className="w-16 h-16 rounded-full flex justify-center items-center bg-primary text-2xl text-black">
                  2
                </div>
              </div>
              <div className="flex flex-col md:flex-row w-full justify-stretch items-center gap-8">
                <div className="flex flex-col flex-grow space-y-2 md:w-3/4 ">
                  <p className="text-xl font-bold">Apply for WEL Token</p>
                  <p>
                    Follow the KYC process. You will need your ID and will be
                    required to take a selfie.
                  </p>
                </div>
                <div className="flex md:w-1/4 ">
                  {" "}
                  <PersonaFlow
                    referrer={referrer}
                    onComplete={(
                      inquiryId: string,
                      status: string,
                      fields: any
                    ) => {
                      console.log("PERSONA", { inquiryId, status, fields });
                      setKYCState(status as "completed" | "failed");
                    }}
                  />
                </div>
              </div>
            </div>

            <p>
              Upon completion of these steps, your WEL token purchase
              application will be reviewed. If approved, you will receive the
              WEL token after TGE (20% at TGE, 1-month cliff, then 6-month
              linear vesting). If not, you will be eligible for a refund.
            </p>
          </>
        )}
      </div>
      {kycState === "completed" && (
        <div className="flex flex-col items-center gap-8">
          <p className="md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2DE1FB] to-[#086BFA]">
            Thank you! Your application to purchase the WEL token is under
            review.
          </p>

          <p className="w-2/3 text-center">
            If approved, you will receive the WEL token after TGE (20% at TGE,
            1-month cliff, then 6-month linear vesting). If not, you will be
            eligible for a refund. We will notify you soon.
          </p>
          <div className="text-center space-y-2">
            <p>Follow us on Twitter and join our Discord to stay updated.</p>
            <p>
              Twitter:{" "}
              <Link href="https://x.com/welsharehealth" isExternal>
                https://x.com/welsharehealth
              </Link>
            </p>
            <p>
              Discord:{" "}
              <Link href="https://discord.com/invite/awQw66CUdP" isExternal>
                https://discord.com/invite/awQw66CUdP
              </Link>
            </p>
          </div>
        </div>
      )}
      {/* 
      {kycState === "failed" && (
        <div className="flex flex-col items-center gap-4">
          <XCircle fill="#ff1900" size={128} weight="fill" />
          <p className="w-1/2 text-center text-lg">
            You unfortunately did not pass the KYC process. If you provided an
            email address, we&apos;ll get back to you.
          </p>
        </div>
      )} */}
    </>
  );
}
