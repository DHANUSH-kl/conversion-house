import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CONVERSION HOUSE — Websites & Online Stores That Bring In Business",
  description:
    "Conversion House designs and builds websites, online stores, and brand identities for small businesses. Simple, fast, built to bring in customers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
