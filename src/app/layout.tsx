import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cell Mart Pro | Premium Mobile Store",
  description: "Discover your next phone at Cell Mart Pro. Premium smartphones and accessories across Sri Lanka."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
