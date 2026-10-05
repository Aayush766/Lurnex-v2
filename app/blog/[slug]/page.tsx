import type { Metadata } from "next";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { blogPostBySlug, blogPosts } from "@/lib/blog-posts";

export function generateStaticParams() { return blogPosts.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = blogPostBySlug((await params).slug);
  return post ? { title: `${post.title} | lurnex Journal`, description: post.excerpt, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { title: post.title, description: post.excerpt, images: [post.image] } } : { title: "Learning article | lurnex Journal", description: "Study strategies, exam guidance and thoughtful perspectives on learning." };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogArticle slug={slug} />;
}
