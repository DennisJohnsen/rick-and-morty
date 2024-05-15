import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "A detailed description of all Rick and Morty characters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.className} lang="en">
      <body>{children}</body>
    </html>
  );
}
