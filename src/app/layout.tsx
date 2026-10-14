import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR, Poppins, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
const robotoSlab = Roboto_Slab({ subsets: ["latin"], variable: "--font-roboto-slab" });
// 한글 글리프는 라틴 폰트에 없으므로 Noto 폰트로 보완합니다.
const notoSansKr = Noto_Sans_KR({ preload: false, variable: "--font-noto-sans-kr" });
const notoSerifKr = Noto_Serif_KR({
  preload: false,
  weight: ["600", "700"],
  variable: "--font-noto-serif-kr",
});

// 페인트 전에 인트로 재생 여부를 정해 본문이 먼저 번쩍 보이지 않게 합니다.
const introScript = `try{var r=document.documentElement;var seen=sessionStorage.getItem("intro-seen");var rm=matchMedia("(prefers-reduced-motion: reduce)").matches;r.dataset.intro=seen||rm?"skip":"play"}catch(e){}`;

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${poppins.variable} ${robotoSlab.variable} ${notoSansKr.variable} ${notoSerifKr.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="relative min-h-screen font-sans">{children}</body>
    </html>
  );
}
