import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Devroast",
  description: "Paste your code. Get roasted. Brutally honest feedback.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-bg-page flex flex-col font-mono text-text-primary">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
