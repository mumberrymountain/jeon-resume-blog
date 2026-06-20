/** @type {import('next').NextConfig} */

// GitHub Pages(프로젝트 페이지)에 배포할 때는 저장소 이름이 basePath가 됩니다.
// 예) https://<user>.github.io/jeon-resume-blog
// 사용자/조직 페이지(<user>.github.io)에 배포한다면 basePath는 빈 문자열로 두세요.
const isProd = process.env.NODE_ENV === "production";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? "/jeon-resume-blog" : "");

const nextConfig = {
  output: "export",
  basePath: basePath || undefined,
  // 정적 export에서는 next/image 최적화 서버가 없으므로 비활성화합니다.
  images: { unoptimized: true },
  // GitHub Pages에서 /about -> /about/index.html 로 잘 매칭되도록 합니다.
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
