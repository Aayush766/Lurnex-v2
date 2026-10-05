import { RegisterForm } from "@/components/forms/RegisterForm";

type Props = { searchParams: Promise<{ program?: string; redirect?: string }> };

export default async function Page({ searchParams }: Props) {
  const { program, redirect } = await searchParams;
  return (
    <main className="min-h-screen bg-[#071b3a]">
      <RegisterForm initialProgram={program} initialRedirect={redirect} />
    </main>
  );
}
