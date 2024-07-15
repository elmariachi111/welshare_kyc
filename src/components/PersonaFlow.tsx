"use client";
import { Button } from "@nextui-org/button";
import { useSIWE } from "connectkit";
import { Client, setupIframe } from "persona";
import { useEffect, useState, useRef } from "react";

export default function PersonaFlow() {
  const templateId = "itmpl_aCtu57jQGhPeMerAgE1zYZsHicch";
  const environment = "sandbox";
  const { data, isSignedIn } = useSIWE();
  let client = useRef<Client | null>(null);

  useEffect(() => {
    if (!data) return;

    console.log("new client");
    const _client = new Client({
      templateId,
      environment,
      onReady: () => {
        console.log("READY");
        client.current = _client;
      },
      onError: (error) => console.error(error),
      fields: { crypto_wallet_address: data.address },
    });
  }, [data]);

  return (
    <Button
      className="bg-gradient-to-br from-[#07F1EF] to-[#3045FF] px-8"
      onClick={() => client.current?.open()}
    >
      Start KYC Process
    </Button>
  );
}
