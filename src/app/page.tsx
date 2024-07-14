import SignoutButton from "@/components/SignoutButton";
import { Button } from "@nextui-org/button";
import { useSIWE } from "connectkit";

//flex-col items-center justify-between
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="container">
        <h1> hello </h1>

        <SignoutButton />
      </div>
    </main>
  );
}
