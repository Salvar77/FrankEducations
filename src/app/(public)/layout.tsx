"use client";
import { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isHome ? (
        <main>{children}</main>
      ) : (
        <div className={`content ${isOpen ? "offset" : ""}`}>
          <main>{children}</main>
        </div>
      )}
    </>
  );
}
