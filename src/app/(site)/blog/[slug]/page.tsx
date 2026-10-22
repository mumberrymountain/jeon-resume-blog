import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { mdxComponents } from "@/components/mdx-components";
import { site } from "@/config/site";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}/`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      authors: [site.name],
      tags: post.tags,
    },
    twitter: {
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // 검색엔진이 글 제목·작성일·작성자를 정확히 읽도록 하는 구조화 데이터입니다.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "ko-KR",
    keywords: post.tags.join(", "),
    url: `${site.url}/blog/${post.slug}/`,
    mainEntityOfPage: `${site.url}/blog/${post.slug}/`,
    author: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    <article className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Link
        href="/blog"
        className="inline-flex text-sm text-muted transition-colors hover:text-accent"
      >
        ← 목록으로
      </Link>

      <header className="space-y-3 border-b border-border pb-6">
        <h1 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
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
        <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                // 빌드 시점에 Shiki로 코드 블록 언어별 색상을 입힙니다.
                rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
              },
            }}
          />
      </div>
    </article>
  );
}
