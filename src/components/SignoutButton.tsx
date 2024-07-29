"use client";
import { Button } from "@nextui-org/button";
import { useSIWE } from "connectkit";

export default function SignoutButton() {
  const { isReady, isRejected, isLoading, isSignedIn, signOut } = useSIWE();
  if (!isSignedIn) return null;

  return (
    <Button
      radius="sm"
      className="bg-gradient-to-br from-[#07F1EF] to-[#3045FF] px-8"
      onClick={() => signOut()}
    >
      Sign out
    </Button>
  );
}
