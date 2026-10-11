"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MailIcon, PenIcon, PullRequestIcon, UserIcon } from "@/components/Icons";

const nav = [
  { href: "/", label: "About", icon: UserIcon },
  { href: "/contributions", label: "Contributions", icon: PullRequestIcon },
  { href: "/blog", label: "Blog", icon: PenIcon },
  { href: "/contact", label: "Contact", icon: MailIcon },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

// 오른쪽 세로 메뉴 (모바일에서는 가로 4칸)
export function NavMenu() {
  const pathname = usePathname();

  return (
    <nav className="intro-item intro-d4 rounded-2xl bg-panel p-3 lg:sticky lg:top-[7.5rem] lg:mt-24 lg:p-4">
      <ul className="grid grid-cols-4 gap-2 lg:grid-cols-1 lg:gap-4">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex h-16 flex-col items-center justify-center gap-1.5 rounded-xl px-1 text-[10px] font-medium tracking-tight transition-colors lg:text-[11px] lg:tracking-normal lg:aspect-square lg:h-auto ${
                  active
                    ? "bg-accent text-white"
                    : "bg-tile text-muted hover:bg-accent hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
