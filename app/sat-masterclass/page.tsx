
import type { Metadata } from "next";
import SATMasterclass from "./sat-masterclass";
import "./sat-masterclass.css";

const pageTitle = "November SAT Prep Masterclass | Lurnex";
const pageDescription =
  "Prepare for the November 7 SAT with Lurnex. Join focused Math and Reading & Writing masterclass sessions on October 24 or 31, 2026.";

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
