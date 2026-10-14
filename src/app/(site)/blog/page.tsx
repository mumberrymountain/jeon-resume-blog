import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { PageTitle } from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-10">
      <PageTitle title="Blog" description="기록하고 싶은 것들을 적습니다." />

      {posts.length === 0 ? (
        <p className="text-muted">아직 작성된 글이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/50"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-accent">{post.title}</h3>
                  <time className="text-sm text-muted">
                    {formatDate(post.date)}
                  </time>
                </div>
                {post.description && (
                  <p className="mt-2 text-sm text-muted">{post.description}</p>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
                  <span>{post.readingTime}</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-bg px-2 py-0.5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
