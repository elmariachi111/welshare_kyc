import { configureServerSideSIWE } from "@/lib/configureSIWE";
import { http } from "viem";
import { mainnet } from "viem/chains";

export const siweServer = configureServerSideSIWE({
  config: {
    chains: [mainnet],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
      ),
    },
  },
  session: {
    cookieName: "connectkit-next-siwe",
    password: process.env.SESSION_SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});
