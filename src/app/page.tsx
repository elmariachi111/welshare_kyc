import SignedInFlow from "@/components/SignedInFlow";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-16">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2DE1FB] to-[#086BFA]">
            {" "}
            Public Pre-sale Phase I{" "}
          </h1>

          <SignedInFlow />
        </div>
      </div>
    </main>
  );
}
