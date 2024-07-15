import PersonaFlow from "@/components/PersonaFlow";
import SignoutButton from "@/components/SignoutButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="container">
        <h1> hello </h1>
        <PersonaFlow />
        <SignoutButton />
      </div>
    </main>
  );
}
