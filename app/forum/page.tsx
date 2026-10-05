import type { Metadata } from "next";
import { ForumPage } from "@/components/forum/ForumPage";

export const metadata: Metadata = {
  title: "Student Forum",
  description: "Ask academic questions and learn with the lurnex student community."
};

export default function Page() {
  return <ForumPage />;
}
