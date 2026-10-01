import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { assetUrl } from "@/lib/asset";

// MDX 본문에서 사용할 커스텀 컴포넌트 매핑입니다.
// 대부분의 스타일은 detail 페이지의 `prose` 클래스가 처리하므로
// 여기서는 내부 링크만 next/link 로 바꿔 줍니다.
export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  },
  img: ({ src = "", alt = "", ...props }) => {
    const resolvedSrc = src.startsWith("/") ? assetUrl(src) : src;
    // 옵시디언처럼 alt 뒤에 "|40%" 또는 "|365"를 붙이면 너비로 적용합니다.
    const [altText, size] = alt.split("|");
    const width = size && (size.endsWith("%") ? size : `${size}px`);
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={resolvedSrc} alt={altText} style={width ? { width } : undefined} {...props} />;
  },
};
