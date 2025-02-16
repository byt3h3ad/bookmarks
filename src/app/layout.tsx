import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "bookmarks - adhiraj",
  description: "what i read.",
  authors: [{ name: "Adhiraj Dutta", url: "https://adhiraj.tech" }],
  metadataBase: new URL("https://bookmarks.adhiraj.tech"),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "bookmarks - adhiraj",
    description: "what i read.",
    type: "website",
    locale: "en_US",
    url: "https://bookmarks.adhiraj.tech",
    siteName: "bookmarks - adhiraj",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
