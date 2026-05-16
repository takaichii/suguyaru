import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header"
import SplashScreen from "@/components/layout/SplashScreen"
import StoreHydration from "@/components/layout/StoreHydration";
import PwaRegistration from "@/components/layout/PwaRegistration";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "スグヤル",
  description: "未来を、今の行動に。",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "スグヤル",
  },
  icons: {
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={jetbrainsMono.className}>
      <body className="min-h-screen bg-terminal-bg text-terminal-text">
        <PwaRegistration />
        <StoreHydration />
        <SplashScreen />
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
