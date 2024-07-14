"use client";

import { getDefaultConfig } from "connectkit";
import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet],
    ssr: true,
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
      ),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
    appName: "welshare public presale",
  })
);

export default config;
