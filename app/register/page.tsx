import type { Metadata } from "next";
import { RegisterForm } from "@/components/forms/RegisterForm";

export const metadata: Metadata = {
  title: "Create your lurnex account",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ program?: string; redirect?: string }> };

export default async function Page({ searchParams }: Props) {
  const { program, redirect } = await searchParams;
  return (
    <main className="min-h-screen bg-[#071b3a]">
      <RegisterForm initialProgram={program} initialRedirect={redirect} />
    </main>
  );
}
