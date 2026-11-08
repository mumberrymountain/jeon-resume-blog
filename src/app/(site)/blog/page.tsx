import type { Metadata } from "next";
import { BlogList } from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description: "DevOps · 인프라 · 클라우드 실무 경험을 기록하는 기술 블로그입니다.",
  alternates: { canonical: "/blog/" },
  openGraph: { url: "/blog/" },
};

export default function BlogListPage() {
  return <BlogList page={1} />;
}
