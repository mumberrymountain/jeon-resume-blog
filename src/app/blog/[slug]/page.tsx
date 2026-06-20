import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { mdxComponents } from "@/components/mdx-components";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="space-y-8">
      <Link
        href="/blog"
        className="inline-flex text-sm text-muted transition-colors hover:text-accent"
      >
        ← 목록으로
      </Link>

      <header className="space-y-3 border-b border-border pb-6">
        <h1 className="text-3xl font-bold sm:text-4xl">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <time>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-surface px-2 py-0.5">
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-accent prose-pre:border prose-pre:border-border">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  );
}
