import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getAllPosts } from "@/lib/posts";

// 정적 export에서도 빌드 시점에 sitemap.xml 파일로 만들어지도록 합니다.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.date;

  const pages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: latest, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/blog/`, lastModified: latest, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/contributions/`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/contact/`, changeFrequency: "yearly", priority: 0.3 },
  ];

  return [
    ...pages,
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}/`,
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
