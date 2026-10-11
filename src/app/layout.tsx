import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Sans_KR, Noto_Serif_KR, Poppins, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { NavMenu } from "@/components/NavMenu";
import { Intro } from "@/components/Intro";
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
      <body className="relative min-h-screen font-sans">
        <Intro name={site.nameEn} />
        <div className="hero-bg pointer-events-none absolute inset-x-0 top-0 h-[480px]" aria-hidden />

        <div className="relative mx-auto max-w-[1280px] px-4 lg:px-6">
          <header className="flex justify-center py-6 lg:justify-start lg:py-10">
            <Link
              href="/"
              className="intro-item intro-d1 border-y border-white/70 px-1 py-1 font-serif text-lg uppercase tracking-[0.25em] text-white"
            >
              {site.nameEn}
            </Link>
          </header>

          <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)_112px] lg:items-start lg:gap-8">
            <Sidebar />
            <main className="intro-item intro-d3 order-last min-w-0 rounded-[20px] bg-panel px-5 py-8 sm:px-10 sm:py-12 lg:order-none lg:mt-24">
              {children}
            </main>
            <NavMenu />
          </div>

          <footer className="py-10 text-center text-sm text-muted">
            © {new Date().getFullYear()} {site.nameEn}. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
