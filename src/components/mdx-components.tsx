import type { MDXComponents } from "mdx/types";
import Link from "next/link";

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
};
