"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

import CustomSIWEButton from "./CustomSiweButton";
import Image from "next/image";

export default function Header() {
  return (
    <Navbar>
      <NavbarBrand>
        <Image src="/welshare_logo.png" alt="Logo" width={200} height={200} />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem></NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <CustomSIWEButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
