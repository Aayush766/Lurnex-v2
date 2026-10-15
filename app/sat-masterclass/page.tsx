
import type { Metadata } from "next";
import SATMasterclass from "./sat-masterclass";
import "./sat-masterclass.css";

const pageTitle = "SAT Master Class 2026 | Lurnex";
const pageDescription =
  "Get ready for the November SAT with focused Math, Reading & Writing strategies, expert-led practice, and targeted preparation on October 24 and 31.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/sat-masterclass",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/sat-masterclass",
    siteName: "Lurnex",
    type: "website",
    images: [
      {
        url: "/assets/images/sat-masterclass.png",
        width: 1400,
        height: 1100,
        alt: "Lurnex SAT Master Class — focused preparation for the November SAT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/assets/images/sat-masterclass.png"],
  },
};

export default function Page() {
  return <SATMasterclass />;
}
