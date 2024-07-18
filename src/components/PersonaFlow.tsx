"use client";
import { Button } from "@nextui-org/button";
import { useSIWE } from "connectkit";
import { Client } from "persona";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";

export default function PersonaFlow({
  onComplete,
  onCancel,
  referrer,
}: {
  onComplete?: (inquiryId: string, status: string, fields: any) => void;
  onCancel?: (inquiryId?: string, sessionToken?: string) => void;
  referrer?: string | null;
}) {
  const templateId = process.env.NEXT_PUBLIC_PERSONA_TEMPLATE;
  const environment = process.env.NEXT_PUBLIC_PERSONA_ENVIRONMENT as
    | "sandbox"
    | "production";

  const { data, isSignedIn } = useSIWE();

  const startKycFlow = () => {
    const client = new Client({
      templateId,
      environment,
      onReady: () => {
        console.log("READY");

        client.open();
      },
      onComplete({ inquiryId, status, fields }) {
        if (onComplete) {
          onComplete(inquiryId, status, fields);
        }
        console.log("FLOW COMPLETE", inquiryId, status, fields);
      },

      onCancel({ inquiryId, sessionToken }) {
        if (onCancel) {
          onCancel(inquiryId, sessionToken);
        }
      },
      onError: (error) => console.error(error),
      fields: {
        crypto_wallet_address: data.address,
        referrer: referrer || "",
      },
    });
  };

  return (
    <Button
      radius="sm"
      className="w-full bg-gradient-to-br from-[#07F1EF] to-[#3045FF] px-12"
      onClick={() => startKycFlow()}
    >
      Apply For WEL Token
    </Button>
  );
}
