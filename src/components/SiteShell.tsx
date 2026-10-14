import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { NavMenu } from "@/components/NavMenu";
import { Intro } from "@/components/Intro";
import { site } from "@/config/site";

// 블로그 공통 틀: 인트로, 배경, 로고, 사이드바/본문/메뉴, 푸터
// (site) 레이아웃과 404 페이지가 함께 사용합니다. /resume(인쇄용)은 이 틀을 쓰지 않습니다.
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Intro name={site.nameEn} />
      <div className="site-bg" aria-hidden>
        <div className="site-bg__grid" />
        <div className="site-bg__nodes" />
        <div className="site-bg__scan" />
        <div className="site-bg__grain" />
      </div>

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
    </>
  );
}
