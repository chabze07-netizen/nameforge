import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NameForge - AI-Powered Name Generator",
  description: "Generate perfect names for gaming, bands, YouTube, and more",
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
