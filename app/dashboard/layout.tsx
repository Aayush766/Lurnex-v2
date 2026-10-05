"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function LearnerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const goLogin = () => router.replace(`/login?redirect=${encodeURIComponent(pathname || "/dashboard")}`);
    if (!localStorage.getItem("lumex_token")) { goLogin(); return; }
    setReady(true);
    window.addEventListener("lumex-session-expired", goLogin);
    return () => window.removeEventListener("lumex-session-expired", goLogin);
  }, [pathname, router]);
  return ready ? children : <main className="container-shell min-h-[70vh] py-20">Loading your learner account…</main>;
}
