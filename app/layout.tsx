import type { Metadata } from "next";
import "@/app/global.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
