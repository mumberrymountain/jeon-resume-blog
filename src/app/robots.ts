import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

// 주의: 검색엔진은 도메인 루트의 /robots.txt만 읽습니다.
// 프로젝트 페이지(<user>.github.io/jeon-resume-blog)로 배포하면 이 파일은 하위 경로에 생기므로
// 사이트맵은 Search Console·서치어드바이저에 직접 제출해야 합니다. 커스텀 도메인을 쓰면 그대로 동작합니다.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/resume/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
