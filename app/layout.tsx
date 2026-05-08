import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_SC({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "数字资料站 — 精选设计素材与资源",
  description: "精选 UI 素材、模板、字体、插件等数字资料，即买即用。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className={`${noto.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
