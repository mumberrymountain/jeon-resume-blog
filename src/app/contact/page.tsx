import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const items = [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "Location", value: site.location, href: undefined },
    ...site.socials.map((s) => ({
      label: s.label,
      value: s.href.replace(/^https?:\/\//, ""),
      href: s.href,
    })),
  ];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-lg font-medium uppercase tracking-widest text-accent">
          Contact
        </p>
      </header>

      <dl className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <dt className="text-sm text-muted">{item.label}</dt>
            <dd className="mt-1 break-all font-medium">
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="hover:text-accent"
                >
                  {item.value}
                </a>
              ) : (
                item.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
