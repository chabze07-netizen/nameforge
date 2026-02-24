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
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2526355871112801"
     crossOrigin="anonymous"></script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
