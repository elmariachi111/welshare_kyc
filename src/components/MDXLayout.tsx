import { Spacer } from "@nextui-org/spacer";
import Image from "next/image";
import Link from "next/link";
import welshareLogo from "../../public/welshare_logo.png";
import "../app/globals.css";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col p-2">
      <div className="container mx-auto max-w-screen-lg space-y-12">
        <div className="flex flex-row justify-between mt-6 mb-8 gap-4 items-center">
          <div className="w-40">
            <Link href="/">
              <Image src={welshareLogo} alt="Logo" />
            </Link>
          </div>
        </div>
        <div className="flex flex-row gap-3 w-full items-center prose prose-invert">
          <Link href="/" className="">
            Home
          </Link>
          <span>/</span>
          <span>Privacy Policy</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <article className="prose lg:prose-lg prose-invert max-w-none ">
            {children}
            <Spacer y={12} />
          </article>
        </div>
      </div>
    </main>
  );
}
