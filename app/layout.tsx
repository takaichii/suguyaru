import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "スグヤル",
  description: "未来を、今の行動に。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={jetbrainsMono.className}>
      <body className="min-h-screen bg-terminal-bg text-terminal-text">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
