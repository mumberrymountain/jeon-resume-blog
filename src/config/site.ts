// 사이트 전반에서 사용하는 개인 정보/소개 데이터입니다.
// 이 파일만 수정하면 About/Contact/사이드바 내용이 한 번에 바뀝니다.

export const site = {
  // 배포된 사이트의 절대 주소(basePath 포함, 끝 슬래시 없이). canonical·sitemap·OG 태그에 쓰입니다.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mumberrymountain.github.io/jeon-resume-blog",
  // 검색엔진 소유 확인 코드. Google Search Console / 네이버 서치어드바이저에서
  // "HTML 태그" 방식을 고르면 나오는 content 값만 넣으면 됩니다.
  verification: {
    google: "2yEkCkaueHcLqXzgh3jQY2jZHBIWGXHoSJIoSc7HwDo",
    naver: "",
  },
  name: "전인수",
  // 상단 로고에 표시되는 영문 이름
  nameEn: "Jeon Insoo",
  role: "DevOps Engineer & Infra Architect",
  location: "Seoul, Korea",
  email: "mumberrymountain@gmail.com",
  // 사이드바 프로필 이미지 경로 (public 폴더 기준). 없으면 이니셜이 표시됩니다.
  avatar: "/resume-pic.jpg",
  // 이력서 PDF(/resume)용 축소본. 원본은 PDF 용량을 크게 늘리므로 따로 둡니다. 없으면 avatar를 씁니다.
  avatarPrint: "/resume-pic-print.jpg",
  tagline:
    "안정적이고 유지보수하기 좋은 서비스를 만드는 것을 좋아하는 소프트웨어 엔지니어입니다.",
  socials: [
    { label: "GitHub", href: "https://github.com/mumberrymountain" },
    { label: "Terraform Registry", href: "https://registry.terraform.io/namespaces/mumberrymountain" },
    // { label: "LinkedIn", href: "https://www.linkedin.com/in/your-id" },
  ],
};

export type Site = typeof site;
