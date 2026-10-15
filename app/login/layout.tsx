import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in to lurnex",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
