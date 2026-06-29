import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kranthi — Full-Stack & AI Developer",
  description:
    "Kranthi builds end-to-end digital products — mobile apps, web platforms, backend systems, and AI-powered tools. Available for freelance projects.",
  keywords: [
    "Full-Stack Developer",
    "Mobile App Developer",
    "Flutter Developer",
    "React Developer",
    "AI Developer",
    "RAG Systems",
    "Agentic AI",
    "Freelance Developer",
    "Kranthi",
  ],
  authors: [{ name: "Kranthi" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    /* TODO: Replace with actual deployed URL */
    url: "https://kranthi.dev",
    title: "Kranthi — Full-Stack & AI Developer",
    description:
      "Kranthi builds end-to-end digital products — mobile apps, web platforms, backend systems, and AI-powered tools. Available for freelance projects.",
    siteName: "Kranthi — Developer Portfolio",
    /* TODO: Replace with actual OG image */
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kranthi — Full-Stack & AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kranthi — Full-Stack & AI Developer",
    description:
      "Kranthi builds end-to-end digital products — mobile apps, web platforms, backend systems, and AI-powered tools.",
    /* TODO: Replace with actual OG image */
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-base text-text-primary">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
