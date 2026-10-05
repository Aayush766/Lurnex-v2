import type { Metadata } from "next";
import { LocationsExplorer } from "@/components/locations/LocationsExplorer";
import "@/components/locations/locations-explorer.css";

export const metadata: Metadata = {
  title: "Online Tutoring Locations | lurnex",
  description: "Explore personalised online tutoring across the Gulf, South Asia, Southeast Asia, Europe and North America.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return <LocationsExplorer />;
}
