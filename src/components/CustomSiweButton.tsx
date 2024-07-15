import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/react";
import { useSIWE, useModal, SIWESession } from "connectkit";
import { useAccount } from "wagmi";
import { blo } from "blo";
import truncateEthAddress from "@/lib/truncateAddress";
import { SignOut } from "@phosphor-icons/react";

const CustomSIWEButton = () => {
  const { setOpen } = useModal();
  const { isConnected } = useAccount();

  const { data, isReady, isRejected, isLoading, isSignedIn, signOut, signIn } =
    useSIWE({
      onSignIn: (session?: SIWESession) => {},
      onSignOut: () => {},
    });

  const handleSignIn = async () => {
    await signIn()?.then((session?: SIWESession) => {});
  };

  const handleSignOut = async () => {
    await signOut()?.then(() => {});
  };

  if (isSignedIn && data) {
    const src = blo(data.address);
    return (
      <div className="flex flex-row items-center gap-2">
        <Avatar showFallback src={src} name={data.address} size="sm" />
        <div className="flex flex-row items-center">
          <p className="text-sm">{truncateEthAddress(data.address)}</p>
          <Button
            isIconOnly
            color="primary"
            aria-label="Sign out"
            variant="light"
            className="p-2"
            onClick={() => signOut()}
          >
            <SignOut />
          </Button>
        </div>
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
      <Button
        onClick={handleSignIn}
        disabled={isLoading}
        className="bg-gradient-to-br from-[#07F1EF] to-[#3045FF] px-8"
      >
        {isRejected // User Rejected
          ? "Try Again"
          : isLoading // Waiting for signing request
          ? "Awaiting request..."
          : // Waiting for interaction
            "Sign In"}
      </Button>
    );
  }

  return (
    <Button
      className="bg-gradient-to-br from-[#07F1EF] to-[#3045FF] px-8"
      onClick={() => setOpen(true)}
    >
      Connect Wallet
    </Button>
  );
};

export default CustomSIWEButton;
