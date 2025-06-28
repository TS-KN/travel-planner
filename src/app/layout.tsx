import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "旅行プランナー | AI旅行計画アシスタント",
  description:
    "AIを活用した旅行計画アシスタント。目的地、日程、予算などを入力するだけで、最適な旅行プランを提案します。",
  keywords: ["旅行", "旅行計画", "AI", "旅行プランナー", "旅行アシスタント"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gray-50`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
