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
  title: "SIH Hub | SIH 2025",
  description: "Discover SIH problem statements with detailed analysis, advanced search filters, and team collaboration tools. Your ultimate platform for Smart India Hackathon 2025 preparation and team formation.",
  keywords: [
    "SIH", 
    "SIH Hub", 
    "Smart India Hackathon", 
    "SIH problem statements", 
    "SIH 2025", 
    "SIH team collaboration",
    "hackathon problem statements",
    "SIH platform",
    "Smart India Hackathon 2025",
    "SIH team formation",
    "hackathon preparation",
    "innovation challenges",
    "government hackathon",
    "student hackathon India",
    "SIH registration",
    "hackathon search platform"
  ],
  authors: [{ name: "SIH Hub Team" }],
  creator: "SIH Hub",
  publisher: "SIH Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sih2025.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "SIH Hub - Smart India Hackathon Problem Statements & Team Collaboration Platform",
    description: "Access comprehensive SIH problem statements with detailed tags, advanced search options, and team collaboration features. Join thousands of students preparing for Smart India Hackathon 2025.",
    url: "https://sih2025.vercel.app",
    siteName: "SIH Hub",
    images: [
      {
        url: "https://hajiriresource.blob.core.windows.net/drive/6855a16b063f65d55faa775e/1756228805275-Screenshot_2025-08-26_224947_1756228805275_rpm7bu.png",
        width: 1200,
        height: 630,
        alt: "SIH Hub - Smart India Hackathon Problem Statements Platform with Advanced Search and Team Collaboration",
      },
      {
        url: "https://hajiriresource.blob.core.windows.net/drive/6855a16b063f65d55faa775e/1756228805275-Screenshot_2025-08-26_224947_1756228805275_rpm7bu.png",
        width: 1200,
        height: 1200,
        alt: "SIH Problem Statements Database - Find Your Perfect Challenge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SIH Hub - Smart India Hackathon Problem Statements Platform",
    description: "Discover SIH problem statements with advanced search, detailed tags & team collaboration. Your go-to platform for Smart India Hackathon 2025.",
    images: ["https://hajiriresource.blob.core.windows.net/drive/6855a16b063f65d55faa775e/1756228805275-Screenshot_2025-08-26_224947_1756228805275_rpm7bu.png"],
    creator: "@sihhub",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'education',
  classification: 'hackathon platform',
  referrer: 'origin-when-cross-origin',
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
