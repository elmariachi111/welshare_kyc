"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

import CustomSIWEButton from "./CustomSiweButton";

export default function Header() {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">welshare</p>
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
