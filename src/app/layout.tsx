import Header from "@/components/header";
import { Spacer } from "@nextui-org/spacer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { Link } from "@nextui-org/link";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://presale.welshare.health"),
  title: {
    default: "Welshare Presale Phase 3",
    template: "%s | Welshare Presale Phase 3",
  },
  description: "Apply for the $WEL Token now - Welshare Presale Phase 3",
  publisher: "Welshare Health UG",
  authors: [
    {
      name: "Stefan Adolf",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <body>
        <main className="flex min-h-screen flex-col justify-between">
          <div className="container mx-auto max-w-screen-lg p-2">
            <Providers>
              <Header />
              <h1 className="text-center mb-6 text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2DE1FB] to-[#086BFA]">
                Public Pre-Sale Phase 3
              </h1>
              {children}
              <Analytics />
            </Providers>
          </div>

          <Spacer y={12} />
          <div className="w-full bg-gray-900 text-gray-500 p-4">
            <div className="container mx-auto max-w-screen-lg">
              <div className="flex flex-row justify-end">
                <Link
                  href="/privacy-policy"
                  className="hover:underline text-slate-300"
                  isExternal
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
