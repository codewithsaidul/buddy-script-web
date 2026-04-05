"use client";

import { usePathname } from "next/navigation";
import DesktopNav from "./DesktopNav";
import MobileBottomNav from "./MobileBottomNav";
import MobileTopHeader from "./MobileTopHeader";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="_header_wrapper">
      
      {/* --- Desktop Menu Start --- */}
      <DesktopNav isActive={isActive} />
      {/* --- Desktop Menu End --- */}

      {/* --- Mobile Menu Start --- */}
      <MobileTopHeader />
      {/* --- Mobile Menu End --- */}

      {/* --- Mobile Bottom Navigation --- */}
      <MobileBottomNav isActive={isActive} />
      {/* --- Mobile Bottom Navigation End --- */}
    </header>
  );
}
