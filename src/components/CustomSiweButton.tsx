import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/react";
import { useSIWE, useModal, SIWESession } from "connectkit";
import { useAccount } from "wagmi";
import { blo } from "blo";
import truncateEthAddress from "@/lib/truncateAddress";

const CustomSIWEButton = () => {
  const { setOpen } = useModal();
  const { isConnected } = useAccount();

  const { data, isReady, isRejected, isLoading, isSignedIn, signOut, signIn } =
    useSIWE({
      onSignIn: (session?: SIWESession) => {
        // Do something with the data
      },
      onSignOut: () => {
        // Do something when signed out
      },
    });

  const handleSignIn = async () => {
    await signIn()?.then((session?: SIWESession) => {
      // Do something when signed in
    });
  };

  const handleSignOut = async () => {
    await signOut()?.then(() => {
      // Do something when signed out
    });
  };

  if (isSignedIn && data) {
    const src = blo(data.address);
    return (
      <div className="flex flex-row items-center gap-2">
        <Avatar showFallback src={src} name={data.address} size="sm" />
        <p className="text-sm">{truncateEthAddress(data.address)}</p>
      </div>
    );
    // <>
    //   <div>Address: </div>
    //   <div>ChainId: {data?.chainId}</div>
    //   <button onClick={handleSignOut}>Sign Out</button>
    // </>
  }

  if (isConnected) {
    return (
      <Button onClick={handleSignIn} disabled={isLoading}>
        {isRejected // User Rejected
          ? "Try Again"
          : isLoading // Waiting for signing request
          ? "Awaiting request..."
          : // Waiting for interaction
            "Sign In"}
      </Button>
    );
  }

  return <Button onClick={() => setOpen(true)}>Connect Wallet</Button>;
};

export default CustomSIWEButton;
