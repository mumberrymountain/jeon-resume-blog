import Link from "next/link";
import { getPostsByPage, getTotalPages } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { assetUrl } from "@/lib/asset";
import { PageTitle } from "@/components/PageTitle";

// 1페이지는 /blog, 2페이지부터는 /blog/page/N 입니다.
function pageHref(page: number) {
  return page === 1 ? "/blog" : `/blog/page/${page}`;
}

function Pagination({ current, total }: { current: number; total: number }) {
  if (total <= 1) return null;

  const base = "flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-medium transition-colors";
  const idle = "bg-tile text-muted hover:bg-accent hover:text-white";
  const disabled = "bg-tile text-muted opacity-40";

  return (
    <nav aria-label="블로그 페이지" className="flex flex-wrap items-center justify-center gap-2">
      {current > 1 ? (
        <Link href={pageHref(current - 1)} rel="prev" className={`${base} ${idle}`}>
          이전
        </Link>
      ) : (
        <span aria-disabled="true" className={`${base} ${disabled}`}>
          이전
        </span>
      )}

      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={pageHref(page)}
          aria-current={page === current ? "page" : undefined}
          className={`${base} ${page === current ? "bg-accent text-white" : idle}`}
        >
          {page}
        </Link>
      ))}

      {current < total ? (
        <Link href={pageHref(current + 1)} rel="next" className={`${base} ${idle}`}>
          다음
        </Link>
      ) : (
        <span aria-disabled="true" className={`${base} ${disabled}`}>
          다음
        </span>
      )}
    </nav>
  );
}

export function BlogList({ page }: { page: number }) {
  const posts = getPostsByPage(page);

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
                className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/50"
              >
                {post.thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={assetUrl(post.thumbnail)}
                    alt=""
                    loading="lazy"
                    className="aspect-[2/1] w-full border-b border-border bg-bg object-cover"
                  />
                )}
                <div className="p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-accent">{post.title}</h3>
                    <time dateTime={post.date} className="text-sm text-muted">
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
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Pagination current={page} total={getTotalPages()} />
    </div>
  );
}
