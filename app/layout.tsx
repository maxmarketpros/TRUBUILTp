import type { Metadata } from "next";
import { Rubik, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://projects.trubuilt.co'),
  title: "TruBuilt Projects | Modern Decks, Siding & Remodeling",
  description: "Explore the portfolio of TruBuilt - Missouri's premier specialist for custom decks, siding, and home renovations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rubik.variable} ${sourceSans.variable} font-body antialiased bg-white text-dark`}
        suppressHydrationWarning
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
