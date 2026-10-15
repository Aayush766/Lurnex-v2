import type { Metadata } from "next";
import { DashboardAuthGate } from "@/components/auth/DashboardAuthGate";

export const metadata: Metadata = {
  title: "Learner dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardAuthGate>{children}</DashboardAuthGate>;
}
