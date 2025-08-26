import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SIH Hub",
  description: "Explore Smart India Hackathon problem statements and find your next innovative challenge.",
  keywords: ["SIH Hub", "Smart India Hackathon", "Problem Statements", "Innovation"],
  openGraph: {
    title: "SIH Hub",
    description: "Explore Smart India Hackathon problem statements and find your next innovative challenge.",
    url: "https://sih2025.vercel.app",
    siteName: "SIH Hub",
    images: [
      {
        url: "https://hajiriresource.blob.core.windows.net/drive/6855a16b063f65d55faa775e/1756228805275-Screenshot_2025-08-26_224947_1756228805275_rpm7bu.png",
        width: 1200,
        height: 630,
        alt: "SIH Hub - Smart India Hackathon Problem Statements",
      },
    ],
  }
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
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
