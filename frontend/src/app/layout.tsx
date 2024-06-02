import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import ParentProvider from "./ParentProvider";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KaziCode",
  description: "Datacurve Take Home Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ParentProvider>
          <Header />
          {children}
          <Footer />
        </ParentProvider>
      </body>
    </html>
  );
}
