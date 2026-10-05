import type { Metadata } from "next";
import "./globals.css";
import "@/components/courses/curriculum/curriculum-page.css";
import { defaultDescription, siteUrl } from "@/lib/seo";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { ScrollRegistrationModal } from "@/components/ui/ScrollRegistrationModal";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SitewideLeadCapture } from "@/components/ui/SitewideLeadCapture";
import "@/components/ui/sitewide-lead.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "lurnex | Online Learning, JEE, NEET, SAT & Global Academic Programs",
    template: "%s | lurnex"
  },
  description: defaultDescription,
  keywords: [
    "online learning", "online tutoring", "JEE preparation", "NEET preparation",
    "SAT preparation", "IB Diploma", "global tutoring", "one-to-one tutoring",
    "personalised learning", "online classes", "exam preparation",
    "international students", "academic mentoring"
  ],
  authors: [{ name: "lurnex" }],
  creator: "lurnex",
  publisher: "lurnex",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "lurnex | Online Learning, JEE, NEET, SAT & Global Academic Programs",
    description: defaultDescription,
    siteName: "lurnex"
  },
  twitter: {
    card: "summary_large_image",
    title: "lurnex | Online Learning & Global Academic Programs",
    description: defaultDescription
  },
  icons: { icon: "/icon.svg" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning><Header />{children}<SitewideLeadCapture /><Footer /><ScrollRegistrationModal /><WhatsAppWidget /></body>
    </html>
  );
}
