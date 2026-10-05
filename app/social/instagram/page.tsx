import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F4FAFF]">
      <div className="container-shell py-20">
        <Link href="/" className="text-sm font-bold text-[#087FF5]">← Back to lurnex</Link>
        <h1 className="mt-8 text-4xl font-extrabold text-[#071B3A]">Instagram</h1>
        <p className="mt-4 max-w-2xl text-slate-600">lurnex Instagram.</p>
        <p className="mt-8 text-sm text-slate-500">This route is intentionally lightweight and ready for the next content phase.</p>
      </div>
    </main>
  );
}
