import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xyberwear - Wear the Future, Own the Digital",
  description:
    "Xyberwear is the world's first phygital fashion platform. Every physical garment comes with an exclusive NFT, bridging reality and the metaverse.",
  keywords: "phygital fashion, NFT clothing, custom apparel, metaverse fashion, digital assets, NFT gallery, cyberwear, blockchain fashion",
  authors: [{ name: "Xyberwear" }],
  openGraph: {
    title: "Xyberwear - Wear the Future, Own the Digital",
    description: "Experience the world's first phygital fashion platform. Every physical garment comes with an exclusive NFT.",
    url: "https://xyberwear.com",
    siteName: "Xyberwear",
    images: [
      {
        url: "https://xyberwear.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Xyberwear - Phygital Fashion",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xyberwear - Wear the Future, Own the Digital",
    description: "Experience the world's first phygital fashion platform.",
    images: ["https://xyberwear.com/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-gray-50`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}