"use client";

import config from "@/utils/wagmiConfig";
import { NextUIProvider } from "@nextui-org/react";

import { siweClient } from "@/utils/siweClient";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import { WagmiProvider } from "wagmi";

export function Providers({ children }: { children: React.ReactNode }) {
  // const config = getDefaultConfig({
  //   projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
  //   chains: [mainnet],
  //   ssr: true, // If your dApp uses server side rendering (SSR)
  //   transports: {
  //     [mainnet.id]: http(
  //       `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  //     ),
  //   },
  // });

  const queryClient = new QueryClient();

  return (
    <NextUIProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <siweClient.Provider
            enabled={true} // defaults true
            onSignIn={console.debug}
            nonceRefetchInterval={60 * 1000}
            sessionRefetchInterval={60 * 1000}
          >
            <ConnectKitProvider
              theme="midnight"
              options={{ walletConnectName: "WalletConnect" }}
            >
              {children}
            </ConnectKitProvider>
          </siweClient.Provider>
        </QueryClientProvider>
      </WagmiProvider>
    </NextUIProvider>
  );
}
