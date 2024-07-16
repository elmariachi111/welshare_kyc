"use client";

import Image from "next/image";
import welshareLogo from "../../public/welshare_logo.png";
import CustomSIWEButton from "./CustomSiweButton";

export default function Header() {
  return (
    <div className="flex flex-row justify-between mt-8 mb-20 gap-4 items-center">
      <div className="w-40">
        <Image src={welshareLogo} alt="Logo" />
      </div>
      <CustomSIWEButton />
    </div>
  );
}
