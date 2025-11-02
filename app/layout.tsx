import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hientensai.com";

export const metadata: Metadata = {
  title: {
    default: "Hiền Tensai Blog",
    template: "%s | Hiền Tensai Blog",
  },
  description: "Chia sẻ về cuộc sống, học tập và du lịch",
  keywords: ["blog", "cuộc sống", "học tập", "du lịch", "Việt Nam"],
  authors: [{ name: "Hiền Tensai" }],
  creator: "Hiền Tensai",
  publisher: "Hiền Tensai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/feed", title: "RSS Feed" }],
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    siteName: "Hiền Tensai Blog",
    title: "Hiền Tensai Blog",
    description: "Chia sẻ về cuộc sống, học tập và du lịch",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hiền Tensai Blog",
    description: "Chia sẻ về cuộc sống, học tập và du lịch",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hientensai.com";

  return (
    <html lang="vi" className={inter.variable}>
      <body className="font-sans antialiased bg-[#fafafa]">
        <StructuredData
          type="website"
          data={{
            website: {
              name: "Hiền Tensai Blog",
              url: siteUrl,
              description: "Chia sẻ về cuộc sống, học tập và du lịch",
            },
          }}
        />
        <StructuredData
          type="organization"
          data={{
            organization: {
              name: "Hiền Tensai Blog",
              url: siteUrl,
            },
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
