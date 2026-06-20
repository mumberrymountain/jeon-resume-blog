"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";

const nav = [
  { href: "/", label: "About" },
  { href: "/contributions", label: "Contributions" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();
  const initials = site.name.slice(0, 2);

  return (
    <aside className="lg:sticky lg:top-10 lg:h-fit lg:w-64 lg:shrink-0">
      <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center gap-4 lg:flex-col lg:items-center lg:text-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg text-2xl font-semibold text-accent lg:h-36 lg:w-36 lg:text-4xl">
            {site.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={site.avatar}
                alt={site.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <div className="lg:mt-4">
            <h1 className="text-lg font-semibold">{site.name}</h1>
            <p className="text-sm text-muted">{site.role}</p>
          </div>
        </div>

        <nav className="mt-6 flex gap-2 lg:flex-col">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent/15 text-accent"
                    : "text-muted hover:bg-bg hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {site.socials.length > 0 && (
          <div className="mt-6 hidden flex-wrap gap-3 border-t border-border pt-4 text-sm lg:flex">
            {site.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-muted hover:text-accent"
              >
                {s.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
