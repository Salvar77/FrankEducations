// app/layout.tsx
import type { Metadata } from "next";
import { arimo } from "../lib/fonts";
import Nav from "@/components/nav/Nav"; // TERAZ BEZ PROPSÓW
import Footer from "@/components/footer/Footer";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Frank Educations - Study Abroad",
  description: "Study abroad opportunities with Frank Educations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={arimo.className}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
