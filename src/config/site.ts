// 사이트 전반에서 사용하는 개인 정보/소개 데이터입니다.
// 이 파일만 수정하면 About/Contact/사이드바 내용이 한 번에 바뀝니다.

export const site = {
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
