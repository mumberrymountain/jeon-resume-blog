import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogList } from "@/components/BlogList";
import { getTotalPages } from "@/lib/posts";

type Props = { params: Promise<{ page: string }> };

export const dynamicParams = false;

// 정적 export는 빈 목록을 허용하지 않으므로 1페이지도 함께 생성합니다. (canonical은 /blog/)
export function generateStaticParams() {
  return Array.from({ length: getTotalPages() }, (_, i) => ({ page: String(i + 1) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const url = page === "1" ? "/blog/" : `/blog/page/${page}/`;

  return {
    title: page === "1" ? "Blog" : `Blog - ${page}페이지`,
    description: "DevOps · 인프라 · 클라우드 실무 경험을 기록하는 기술 블로그입니다.",
    alternates: { canonical: url },
    openGraph: { url },
  };
}

export default async function BlogPaginatedPage({ params }: Props) {
  const { page } = await params;
  const pageNumber = Number(page);

  if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > getTotalPages()) {
    notFound();
  }

  return <BlogList page={pageNumber} />;
}
