"use client";
import { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/footer/Footer";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header>
        <Nav isOpen={isOpen} toggleNav={() => setIsOpen(!isOpen)} />
      </header>

      {isHome ? (
        <main>{children}</main>
      ) : (
        <div className={`content ${isOpen ? "offset" : ""}`}>
          <main>{children}</main>
        </div>
      )}

      <Footer />
    </>
  );
}
