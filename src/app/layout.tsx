import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Rubik as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ['latin'],
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: "Media Reviews",
  description: "Seus filmes e séries favoritos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={fontSans.className}>
        <Providers>
          <Header />

          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
