"use client";
import { Button } from "@nextui-org/button";
import { useSIWE } from "connectkit";

export default function SignoutButton() {
  const { isReady, isRejected, isLoading, isSignedIn, signOut } = useSIWE();
  if (!isSignedIn) return null;

  return <Button onClick={signOut}>Sign out</Button>;
}
