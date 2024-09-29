"use client";

import { Link } from "@nextui-org/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Address, formatEther } from "viem";
import { useAccount } from "wagmi";
import PersonaFlow from "./PersonaFlow";

type Participant = {
  id: string;
  projectId: number;
  address: Address;
  volume: bigint;
  volumeUSD: bigint;
  balance: bigint;
  stakedBalance: bigint;
  paymentsCount: number;
};

const formatCurrency = (value: bigint): string => {
  const dec = parseFloat(formatEther(value));
  return dec.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default function SignedInActions({
  kycState,
  setKYCState,
  referrer,
}: {
  kycState?: "failed" | "completed" | "not-started" | "not-finalized";
  setKYCState: Dispatch<
    SetStateAction<
      "completed" | "failed" | "not-started" | "not-finalized" | undefined
    >
  >;
  referrer?: string | null;
}) {
  const { address } = useAccount();
  const [participant, setParticipant] = useState<Participant | null>();

  useEffect(() => {
    if (!address) return;
    (async () => {
      const res = await (
        await fetch(`/api/jb?address=${address.toLowerCase()}`)
      ).json();
      if (res.data.participant) {
        setParticipant({
          id: res.data.participant.id,
          projectId: res.data.participant.projectId,
          address: res.data.participant.address,
          balance: BigInt(res.data.participant.balance),
          volume: BigInt(res.data.participant.volume),
          volumeUSD: BigInt(res.data.participant.volumeUSD),
          paymentsCount: res.data.participant.paymentsCount,
          stakedBalance: BigInt(res.data.participant.stakedBalance),
        });
      } else {
        setParticipant(null);
      }
    })();
  }, [address]);

  useEffect(() => {
    if (!address) return;
    (async () => {
      const fetchRes = await fetch(
        `/api/status?address=${address.toLowerCase()}`
      );
      if (fetchRes.status === 404) {
        setKYCState("not-started");
        return;
      }

      const res = await fetchRes.json();

      if (res.status === "N") {
        //seems unused
        setKYCState("not-started");
        return;
      }

      if (!res.final_approval) {
        setKYCState("not-finalized");
        return;
      }

      if (res.final_approval === "approved") {
        setKYCState("completed");
        return;
      }

      if (res.final_approval === "not approved") {
        setKYCState("failed");
        return;
      }
    })();
  }, [address]);

  let voucherAmount = participant
    ? formatCurrency(participant.balance)
    : undefined;

  return (
    <>
      <div className="flex flex-col items-start gap-12 text-sm pl-0 md:pl-12 mt-8 md:mt-0">
        <div className="flex flex-col md:flex-row bg-zinc-800 p-6 rounded-2xl gap-6 items-center w-full">
          <div className="flex flex-col md:flex-row w-full justify-stretch items-center gap-8">
            <div className="flex flex-col flex-grow space-y-2 md:w-3/4 ">
              <p className="text-xl font-bold">Purchased Vouchers</p>

              {voucherAmount ? (
                <p>
                  You have purchased <strong>{voucherAmount} Vouchers</strong>{" "}
                  at{" "}
                  <Link href="https://juicebox.money/@welshare" isExternal>
                    juicebox.money/@welshare
                  </Link>
                  . Note: These are not the WEL tokens. The WEL tokens will be
                  distributed to users who were accepted to purchase.
                </p>
              ) : (
                <p>You have not purchased any vouchers.</p>
              )}
            </div>
            {voucherAmount && (
              <div className="flex md:w-1/4 flex-col items-center gap-2">
                <p className="text-2xl font-bold"> {voucherAmount} vouchers</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row bg-zinc-800 p-6 rounded-2xl gap-6 items-center w-full">
          <div className="flex flex-col md:flex-row w-full justify-stretch items-center gap-8">
            <div className="flex flex-col space-y-2 md:w-3/4">
              {kycState === "completed" && (
                <>
                  <p className="text-xl font-bold">
                    Application State: You&apos;re in!
                  </p>
                  <p>
                    Congratulations! Your application was successful. You will
                    receive WEL tokens in a 1:1 ratio of your vouchers (20% at
                    TGE, 1-month cliff, then 6-month linear vesting).
                  </p>
                </>
              )}
              {kycState === "not-started" && (
                <>
                  <p className="text-xl font-bold">
                    Application State: Please complete the KYC process!
                  </p>
                  <p>
                    Attention: You still need to complete the KYC process to
                    apply for the WEL token purchase. If you don&apos;t complete
                    this step,{" "}
                    <strong>you won&apos;t receive the WEL token</strong>. You
                    will need your ID and will be required to take a selfie.
                  </p>
                </>
              )}
              {kycState === "not-finalized" && (
                <>
                  <p className="text-xl font-bold">
                    Application State: Under Review
                  </p>
                  <p>
                    You have submitted a KYC application using your address (
                    {address}) and we&apos;re reviewing it. Please stand by and
                    in case you have questions, don&apos;t hesitate to get in
                    touch with us on{" "}
                    <Link
                      href="https://t.me/welsharehealth"
                      isExternal
                      className="inline"
                    >
                      our Telegram group
                    </Link>
                  </p>
                </>
              )}
              {kycState === "failed" && (
                <>
                  <p className="text-xl font-bold">
                    Application State: Rejected
                  </p>
                  <p>
                    Unfortunately, your application{" "}
                    <strong>was not successful</strong>. If you have purchased
                    vouchers you are eligible for a refund. The team will
                    announce refund instructions soon.
                  </p>
                </>
              )}
            </div>
            {kycState === "not-started" && (
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
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="text-center space-y-2">
          <p>Follow us on Twitter and join our Telegram to stay updated.</p>
          <p>
            Twitter:{" "}
            <Link href="https://x.com/welsharehealth" isExternal>
              https://x.com/welsharehealth
            </Link>
          </p>
          <p>
            Telegram:{" "}
            <Link href="https://t.me/welsharehealth" isExternal>
              https://t.me/welsharehealth
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
